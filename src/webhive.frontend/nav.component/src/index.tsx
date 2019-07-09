import { createElement as h } from 'tsx-create-html-element';
import './nav.component';

window.addEventListener('route.transition.end', (event: any) => {
    const { app } = event.detail;
    app.querySelector('#nav').append(<nav-component />);
});
