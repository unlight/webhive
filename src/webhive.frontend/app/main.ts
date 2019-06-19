import * as loadScript from '@shinin/load-script';
import * as cherrytree from 'cherrytree';
import './style.css';

async function main() {
    loadScript('header.js');
    loadScript('nav.js');
    const router = cherrytree({
        log: true,
        pushState: true,
    });

    router.map(route => {
        route('app', { path: '/', abstract: true }, () => {
            route('home', { path: '' });
            route('search', { path: 'search' });
        });
    });

    router.use(({ routes, params, query }) => {
        console.log("mw 1 routes", routes);
        routes.forEach((route, index) => {
            // console.log("route", route);
        });
        //     route.view = handlers[route.name]({
        //         params: transition.params,
        //         query: transition.query
        //     })
        //     var parent = transition.routes[i - 1]
        //     var containerEl = parent ? parent.view.el.querySelector('.outlet') : document.body
        //     containerEl.appendChild(view.render().el)
        // })
    });

    router.listen();
    document.addEventListener('navigate', event => {
        console.log('navigate', event.detail.href);
        router.transitionTo(event.detail.href)
    });
}

main();
