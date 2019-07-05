import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import './style.css';
import { App } from './app/app.component';
import { Home } from './app/home/home.component';
import { NotFound } from './app/notfound/notfound.component';
import { Channels, Channel } from './app/channels/channels.component';

loadScript('header.js');
loadScript('nav.js');

const routes = [
    ['', App, [
        ['/', Home],
        ['/channels', Channels],
        ['/channels/:id', Channel],
        ['*', NotFound],
    ]],
];
const options = { mode: 'hash' };
const router = createRouter(routes, options);

document.addEventListener('DOMContentLoaded', () => router.start(render), { once: true });

const Preact = require('preact');

function render(route, components) {
    let app = components.reduceRight(
        (children, Component) => <Component params={ route.params } > { children } < /Component>,
    null
    );
    Preact.render(app, document.body, document.body.lastElementChild)
}

// function render(route, components) {
//     console.log("components", components);
//     let app = components.reduceRight(
//         (children, Component) => {
//             // route.params children
//             // h(Component)
//             const html = Component({ params: route.params, children });
//             return html;
//         },
//         null
//     );
//     // todo: performacnce issue (find virtual dom render)
//     document.body.innerHTML = app;
// }

interface NavigateEventDetail {
    href: string;
}

function isNavigateCustomEvent(event: any): event is CustomEvent<NavigateEventDetail> {
    return event.type === 'navigate' && event.detail && typeof event.detail.href === 'string';
}

function handleEvents(event: Event) {
    if (isNavigateCustomEvent(event)) {
        router.push(event.detail.href);
    }
}

window.addEventListener('navigate', handleEvents);

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        router.stop();
        window.removeEventListener('navigate', handleEvents);
    });
}
