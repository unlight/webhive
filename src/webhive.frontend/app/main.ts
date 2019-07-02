import * as loadScript from '@shinin/load-script';
import * as createRouter from 'space-router';
import { App } from './app';

const Home = props => `<div>Home</div>`;
const Channels = props => `<div>Channels</div>`;
const Channel = props => `<div>Channel ${props.params.id}</div>`;
const NotFound = props => `<div>404</div>`;

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
    document.body.innerHTML = app;
}

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => router.stop());
}
