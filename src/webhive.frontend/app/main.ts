import page from 'page';
import { loadScript } from './load-script';
import { noop } from './noop';
import { documentBody } from './document-body';
import './style.css';

page('/',
    documentBody(() => require('./home.html')),
    loadScript(['header.js', 'nav.js']),
    noop,
);

page('/search',
    documentBody(() => 'search'),
    noop,
);

page('*',
    documentBody(() => 'NOT FOUND'),
);

page({
    click: false,
});

document.addEventListener('navigatepath', (event: any) => {
    page(event.detail.path);
});
