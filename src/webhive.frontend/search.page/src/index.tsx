export { SearchPageElement } from './search-page-element';
import { createElement as h } from 'h-document-element';

// todo: lazy load

addEventListener('navcomponent.connected.callback', event => {
    event.target.addItem('/search', 'Search', 1);
});

addEventListener('application.start', event => {
    const router = event.detail.router;
    const [rootRoutes] = event.detail.routes;
    const [appRoutes] = rootRoutes.slice(-1);
    appRoutes.unshift(['/search', SearchPage]);
}, { once: true });

function SearchPage({ query }) {
    return <search-page-element q={query.q} />;
}
