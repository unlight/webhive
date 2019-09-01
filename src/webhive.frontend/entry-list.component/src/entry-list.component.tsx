import { EntryListService } from './entry-list.service';
import './entry.component';
import { Entry } from './entry';
import { h, render } from 'preact';

const style = document.createElement('style');
style.textContent = require('./entry-list.component.css');

export class EntryListComponent extends HTMLElement {

    private readonly service: EntryListService;
    private readonly body: HTMLDivElement;

    /**
     * Return an array containing the names of the attributes you want to observe.
     */
    static get observedAttributes() {
        return ['q'];
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
        this.shadow.append(style);
        this.shadow.append(this.body = document.createElement('div'));
        this.service = new EntryListService(this);
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        this.update();
    }

    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     */
    disconnectedCallback() {
    }

    async update() {
        const entries = await this.service.find({ q: this._q });
        render(entries.map(entry => <entry-component entry={entry}></entry-component>), this.body);
    }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     */
    attributeChangedCallback(name, oldValue, newValue) {
    }

    private _q: string;

    public get q(): string {
        return this._q;
    }

    public set q(v: string) {
        this._q = v;
    }
}

if (!customElements.get('entry-list-component')) {
    customElements.define('entry-list-component', EntryListComponent);
}
