import { h } from /* webpackIgnore: true */ '//unpkg.com/h-document-element?module';

export const componentInfo = {
    name: 'Header Component',
    description: 'Header bar.',
    required: {
        'h-document-element': '>=2.0.0',
    },
    version: '1.0.0',
    author: 'Me',
};

import './header.component';

window.addEventListener('application.start', startHeaderComponent, { once: true });

function startHeaderComponent(event: CustomEvent) {

    window.addEventListener('route.transition.end', (event: any) => {
        const { app } = event.detail;
        app.querySelector('#header').append(<header-component />);
    });
}
