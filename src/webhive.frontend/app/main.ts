import page from 'page';
import { loadScript } from './load-script';
import { noop } from './noop';
import { documentBody } from './document-body';

page('/',
    documentBody(() => require('./home.html')),
    loadScript(['./header.js']),
    noop,
);

page('/about',
    documentBody(() => 'about'),
    noop,
);

page('*',
    documentBody(() => 'NOT FOUND'),
);

page();
