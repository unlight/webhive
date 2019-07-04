import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import { App } from './app';
import * as app from './app';

import './style.css';

loadScript('header.js');
loadScript('nav.js');

const routes = [
    ['', App, [
        ['/', app.Home],
        ['*', app.NotFound],
    ]],
];
const options = { mode: 'hash' };
const router = createRouter(routes, options).start(render);

function render(route, components) {
    let app = components.reduceRight(
        (children, Component) => {
            // route.params children
            // h(Component)
            const html = Component({ params: route.params, children });
            return html;
        },
        null
    );
    document.body.innerHTML = app;
}

function handleEvent(event: any) {
    if (event.type === 'navigate') {
        router.push(event.detail.href);
    }
}

window.addEventListener('navigate', handleEvent);

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        router.stop();
        window.removeEventListener('navigate', handleEvent);
    });
}
