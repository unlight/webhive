import { EntryListService } from './entry-list.service';
import { createElement as h } from 'tsx-create-html-element';
import './entry.component';

const styles = document.createElement('style');
styles.textContent = require('./entry-list.component.css');

const template = document.createElement('template');
template.innerHTML = '<div></div>';

export class EntryListComponent extends HTMLElement {

    private readonly service: EntryListService;
    private readonly root: HTMLElement;

    /**
     * Return an array containing the names of the attributes you want to observe.
     */
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(styles.cloneNode(true));
        this.root = this.shadow.appendChild(template.content.cloneNode(true).firstChild as HTMLElement);
        this.service = new EntryListService(this);
    }

    private get shadow() {
        if (!this.shadowRoot) {
            throw new Error('shadowRoot is null');
        }
        return this.shadowRoot;
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    async connectedCallback() {
        const entries = await this.service.find();
        this.root.append(...entries.map(entry => <entry-component entry={entry}></entry-component>));
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

}

if (!customElements.get('entry-list-component')) {
    customElements.define('entry-list-component', EntryListComponent);
}
