// import { createElement as h } from 'h-document-element';
import './nav.component';
// import dimport from 'dimport';

// let h = () => { };

// dimport('//unpkg.com/h-document-element?module').then(exports => {
//     h = exports.h;
// });

window.addEventListener('application.start', startNavComponent, { once: true });

function startNavComponent() {
    window.addEventListener('route.transition.end', (event: any) => {
        const { app } = event.detail;
        app.querySelector('#nav').append(<nav-component />);
    });
}

// h-document-element

export const ComponentInfo = {
    name: 'Nav Component',
    description: 'Shows main navigation menu.',
    required: {
        'h-document-element': '>=2.0.0',
    },
    version: '1.0.0',
    author: 'Me',
};

document.currentScript.setAttribute('ComponentInfo', JSON.stringify(ComponentInfo));

// console.log("document.currentScript", document.currentScript);
