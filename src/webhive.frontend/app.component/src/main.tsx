import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import './style.css';
import { App } from './app/app.component';
import { Home } from './app/home/home.component';
import { NotFound } from './app/notfound/notfound.component';
import { h, render } from 'preact';
import { isNavigatePushCustomEvent, isNavigateSetCustomEvent } from './app/events';

async function main() {
    const components = {
        header: { enabled: true, location: 'header.js', },
        nav: { enabled: true, location: 'nav.js', },
    };
    const loadingComponents = Object.values(components)
        .filter(c => c.enabled)
        .map(c => loadScript(c.location) as Promise<any>);
    const routes = [
        ['', App, [
            ['/', Home],
            // todo: refactor this (plugin system)
            ['/search', () => { loadScript('search-page.js'); return <search-page-element />; }],
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
    window.addEventListener('navigate.push', handleEvents);
    window.addEventListener('navigate.set', handleEvents);
    window.addEventListener('route.transition', console.log);

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
        dispatchEvent(new CustomEvent('route.transition', { detail: { route } }));
        const app = components.reduceRight(
            (children, Component) => <Component params={route.params}>{children}</Component>,
            null
        );
        render(app, document.body);
    }

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => {
            router.stop();
            window.removeEventListener('navigate.set', handleEvents);
            window.removeEventListener('navigate.push', handleEvents);
        });
    }

}

main();
