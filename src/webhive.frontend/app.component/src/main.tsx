import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import './style.css';
import { App } from './app/app.component';
import { Home } from './app/home/home.component';
import { NotFound } from './app/notfound/notfound.component';
import { h, render } from 'preact';

loadScript('header.js');
loadScript('nav.js');

const routes = [
    ['', App, [
        ['/', Home],
        // todo: refactor this
        ['/search', () => { loadScript('search-page.js'); return <search-page-element />; }],
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

interface NavigatePushEventDetail {
    url: string;
    options?: NavigateSetEventDetail;
}

interface NavigateSetEventDetail {
    replace?: boolean;
    params?: any;
    query?: any;
    hash?: any;
}

function isNavigatePushCustomEvent(event: any): event is CustomEvent<NavigatePushEventDetail> {
    return event.type === 'navigate.push' && event.detail && typeof event.detail.url === 'string';
}

function isNavigateSetCustomEvent(event: any): event is CustomEvent<NavigatePushEventDetail> {
    return event.type === 'navigate.set' && event.detail;
}

function handleEvents(event: Event) {
    if (isNavigatePushCustomEvent(event)) {
        router.push(event.detail.url, event.detail.options);
    } else if (isNavigateSetCustomEvent(event)) {
        router.set(event.detail);
    }
}

window.addEventListener('navigate.push', handleEvents);
window.addEventListener('navigate.set', handleEvents);

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        router.stop();
        window.removeEventListener('navigate.set', handleEvents);
        window.removeEventListener('navigate.push', handleEvents);
    });
}
