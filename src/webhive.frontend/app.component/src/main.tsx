import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import './style.css';
import { App } from './app/app.component';
import { Home } from './app/home/home.component';
import { NotFound } from './app/notfound/notfound.component';
import { isNavigatePushCustomEvent, isNavigateSetCustomEvent } from './app/events';
import * as on from 'space-router/src/on';

const components = {
    'example.component': { enabled: true, location: 'example.component.plugin.js' },
};

loadScript('header.js');
loadScript('nav.js');

async function main() {
    const loadingComponents = Object.values(components)
        .filter(c => c.enabled)
        .map(c => loadScript(c.location) as Promise<any>);
    const routes = [
        ['', App, [
            ['/', Home],
            // todo: refactor this (plugin system)
            ['/search', () => { loadScript('search-page.js'); return `<search-page-element />`; }],
            ['*', NotFound],
        ]],
    ];
    const router = createRouter(routes, { mode: 'hash' });
    await Promise.all(loadingComponents);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApplication, { once: true });
    } else {
        startApplication();
    }

    const subsriptions = [
        on(window, 'route.navigate.push', handleEvents),
        on(window, 'route.navigate.set', handleEvents),
    ];

    function startApplication() {
        dispatchEvent(new CustomEvent('application.start', { detail: { router, routes } }));
        router.start(transition);
    }

    function handleEvents(event: Event) {
        if (isNavigatePushCustomEvent(event)) {
            router.push(event.detail.url, event.detail.options);
        } else if (isNavigateSetCustomEvent(event)) {
            router.set(event.detail);
        }
    }

    function transition(route, components) {
        dispatchEvent(new CustomEvent('route.transition.start', { detail: { route, components } }));
        const appHtml = components.reduceRight((children, Component) => {
            return Component({ params: route.params, children });
        }, null);
        dispatchEvent(new CustomEvent('route.transition.end', { detail: { route, components, appHtml } }));
        document.body.innerHTML = appHtml;
    }

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => {
            router.stop();
            subsriptions.forEach(unsubscribe => unsubscribe());
        });
    }

}

main();
