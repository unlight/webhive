export { SearchPageElement } from './search-page-element'

addEventListener('navcomponent.connected.callback', event => {
    event.target.addItem('/search', 'Search');
});
