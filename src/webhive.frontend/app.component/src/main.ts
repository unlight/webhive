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
    // todo: performacnce issue (find virtual dom render)
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
