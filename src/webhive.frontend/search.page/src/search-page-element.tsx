import { CustomElement, Listen, DispatchEmitter, Dispatch } from 'custom-elements-ts';

@CustomElement({
    tag: 'search-page-element',
    template: require('./search-page-element.html'),
    style: require('./search-page-element.css'),
})
export class SearchPageElement extends HTMLElement {

    @Dispatch('route.navigate.set') navigate: DispatchEmitter;

    @Listen('submit', 'form')
    submit(event: Event) {
        const form = new FormData(event.target);
        event.preventDefault();
        const q = form.get('q');
        if (!q) {
            return false;
        }
        const detail = { query: { q } };
        this.navigate.emit({ detail, bubbles: true, composed: true });
    }

}
