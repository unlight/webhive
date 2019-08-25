import * as createRouter from 'space-router';
import { App } from './app/app.component';
import { NotFound } from './app/notfound/notfound.component';
import { isNavigatePushCustomEvent, isNavigateSetCustomEvent } from './app/events';
import * as on from 'space-router/src/on';
import dimport from 'dimport';
import './style.css';

async function main() {
    const config = await dimport('./app.component.config.js');
    const loadingComponents = Object.values(config.components as any[])
        .filter(c => c.enabled)
        .map(c => importComponent(c));
    let router;
    const routes = [
        ['', App, [
            ['*', NotFound],
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
        dispatchEvent(new CustomEvent('application.start', { detail: { routes, dimport } }));
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

    async function importComponent(c) {
        const module = await dimport(c.main);
        const componentInfo = module.componentInfo;
        if (componentInfo.required) {
            Object.keys(componentInfo.required).forEach((name) => {
                dimport(`${name}.js`);
            });
        }
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
