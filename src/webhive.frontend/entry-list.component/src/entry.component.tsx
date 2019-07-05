import { Entry } from './entry';

export class EntryComponent extends HTMLElement {

    private readonly root: HTMLElement;

    /**
     * Return an array containing the names of the attributes you want to observe.
     */
    static get observedAttributes() {
        return [];
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        const entry = this.entry;
        this.innerHTML = `
            <span class="category">${entry.category.name}</span> <a href=${entry.link}>${entry.title}</a>
        </div>`;
    }

    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     */
    disconnectedCallback() {
    }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     */
    attributeChangedCallback(name, oldValue, newValue) {
    }

    private _entry: Entry;
    public get entry(): Entry {
        return this._entry;
    }
    public set entry(v: Entry) {
        this._entry = v;
    }

}

if (!customElements.get('entry-component')) {
    customElements.define('entry-component', EntryComponent);
}
