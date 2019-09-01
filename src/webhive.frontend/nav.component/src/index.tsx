import { h } from /* webpackIgnore: true */ '//unpkg.com/h-document-element?module';

import './nav.component';

window.addEventListener('application.start', startNavComponent, { once: true });

function startNavComponent(event: CustomEvent) {

    window.addEventListener('route.transition.end', (event: CustomEvent) => {
        const { app } = event.detail;
        app.querySelector('#nav').append(<nav-component />);
    });
}

export const componentInfo = {
    name: 'Nav Component',
    description: 'Shows main navigation menu.',
    required: {
        'h-document-element': '>=2.0.0',
    },
    version: '1.0.0',
    author: 'Me',
};
