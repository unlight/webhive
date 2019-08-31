import { CustomElement, Listen, DispatchEmitter, Dispatch, Prop, Watch } from 'custom-elements-ts';

@CustomElement({
    tag: 'search-page-element',
    template: require('./search-page-element.html'),
    style: require('./search-page-element.css'),
})
export class SearchPageElement extends HTMLElement {

    @Prop() q: string;
    private entryList: HTMLElement;

    @Dispatch('route.navigate.set') navigate: DispatchEmitter;

    private get shadow() {
        if (!this.shadowRoot) {
            throw new Error('shadowRoot is null');
        }
        return this.shadowRoot;
    }

    update() {
        this.shadow.querySelector<HTMLInputElement>('input[name=q]').value = this.q;
    }

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

    @Watch('q')
    queryChange() {
        if (!this.q) {
            return;
        }
        const entryList = <entry-list-component q={this.q} />;
        if (this.entryList) {
            this.entryList.replaceWith(entryList);
        } else {
            this.shadow.appendChild(entryList);
        }
        this.entryList = this.shadow.querySelector('entry-list-component');
        this.update();
    }
}
