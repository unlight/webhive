import { createElement as h } from 'h-document-element';
import './nav.component';

window.addEventListener('route.transition.end', (event: any) => {
    const { app } = event.detail;
    app.querySelector('#nav').append(<nav-component />);
});
