export { SearchPageElement } from './search-page-element';
import { createElement as h } from 'h-document-element';

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
    // todo: lazy load
    return <search-page-element q={query.q} />;
}
