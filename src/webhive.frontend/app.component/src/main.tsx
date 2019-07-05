import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import './style.css';
import { App } from './app/app.component';
import { Home } from './app/home/home.component';
import { NotFound } from './app/notfound/notfound.component';
import { Channels, Channel } from './app/channels/channels.component';
import { h, render } from 'preact';

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

document.addEventListener('DOMContentLoaded', () => router.start(transition), { once: true });

function transition(route, components) {
    const app = components.reduceRight(
        (children, Component) => <Component params={route.params}>{children}</Component>,
        null
    );
    render(app, document.body);
}

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
