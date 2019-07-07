import { EntryListService } from './entry-list.service';
import './entry.component';
import { Entry } from './entry';
import { h } from 'virtual-dom-h-proxy';
const mainLoop = require('main-loop');

const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', require('./entry-list.link.css'));

export class EntryListComponent extends HTMLElement {

    private readonly service: EntryListService;

    /**
     * Return an array containing the names of the attributes you want to observe.
     */
    static get observedAttributes() {
        return [];
    }

    private get shadow() {
        if (!this.shadowRoot) {
            throw new Error('shadowRoot is null');
        }
        return this.shadowRoot;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadow.append(link.cloneNode(true));
        this.shadow.append(loop.target);
        this.service = new EntryListService(this);
    }

    private loop = mainLoop([], this.render, {
        create: require('virtual-dom/create-element'),
        diff: require('virtual-dom/diff'),
        patch: require('virtual-dom/patch'),
    });

    render(state: Entry[]) {
        return <div>
            {state.map(entry => <entry-component entry={entry}></entry-component>)}
        </div>;
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    async connectedCallback() {
        const entries = await this.service.find();
        this.loop.update(entries);
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
