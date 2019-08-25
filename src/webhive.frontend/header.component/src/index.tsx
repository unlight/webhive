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

    const { dimport } = event.detail;

    window.addEventListener('route.transition.end', async (event: any) => {
        // todo: I dont like this
        const { h } = await dimport('h-document-element.js');
        const { app } = event.detail;
        app.querySelector('#header').append(<header-component />);
    });
}
