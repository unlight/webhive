import { createElement as h } from 'tsx-create-html-element';
import './header.component';

window.addEventListener('route.transition.end', (event: any) => {
    const { app } = event.detail;
    app.querySelector('#header').append(<header-component />);
});
