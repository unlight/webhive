import * as createRouter from 'space-router';
import * as on from 'space-router/src/on';
import dimport from 'dimport';
import './style.css';
import { App } from './app/app';
import { isNavigatePushCustomEvent, isNavigateSetCustomEvent } from './app/events/events';
import { AboutPage } from './app/+about/about.page';
import { NotFoundPage } from './app/+notfound/notfound.page';

async function main() {
    const config = await dimport('./app.component.config.js');
    const loadingComponents = Object.values(config.components as any[])
        .map(c => importComponent(c));
    let router;
    const routes = [
        ['', App, [
            ['/about', AboutPage],
            ['*', NotFoundPage],
        ]],
    ];
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
        dispatchEvent(new CustomEvent('application.start', { detail: { routes } }));
        router = createRouter(routes, { mode: 'hash' });
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
        const app = components.reduceRight((children, Component) => {
            return Component({ params: route.params, query: route.query, children });
        }, null);
        dispatchEvent(new CustomEvent('route.transition.end', { detail: { route, components, app } }));
        if (!document.body.firstElementChild) {
            document.body.append(document.createElement('main'));
        }
        document.body.firstElementChild!.replaceWith(app);
    }

    async function importComponent(component) {
        const name = `Component %c${component.name || component.main}`;
        const state = component.enabled ? 'is loading' : 'is not loaded (disabled)';
        console.log(`${name} %c${state}`, 'font-weight:bold', '');
        if (!component.enabled) {
            return;
        }
        return dimport(component.main);
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
