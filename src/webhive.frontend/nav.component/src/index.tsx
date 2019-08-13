import './nav.component';

window.addEventListener('application.start', startNavComponent, { once: true });

function startNavComponent(event: CustomEvent) {

    const { dimport } = event.detail;

    window.addEventListener('route.transition.end', async (event: any) => {
        const { app } = event.detail;
        // todo: I dont like this
        const { h } = await dimport('h-document-element.js');
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
