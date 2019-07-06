import { CustomElement, Listen } from 'custom-elements-ts';

@CustomElement({
    tag: 'search-page-element',
    template: require('./search-page-element.html'),
    style: require('./search-page-element.css'),
})
export class SearchPageElement extends HTMLElement {

    @Listen('submit', 'form')
    submit(event: Event) {
        const form = new FormData(event.target);
        event.preventDefault();
        // todo: replace url with navigate
        // get api
    }
}
