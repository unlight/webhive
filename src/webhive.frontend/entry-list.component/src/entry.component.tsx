import { Entry } from './entry';
import * as h from 'vhtml';

// export function EntryComponent({ entry }: { entry: Entry }) {
//     return <div class="entry">
//         <span class="entry__category">{entry.category.name}</span> <a href={entry.link}>{entry.title}</a>
//     </div>;
// }

// const styles = document.createElement('style');
// styles.textContent = require('./entry.component.css');

// const template = document.createElement('template');
// template.innerHTML = require('./entry.component.html');

export class EntryComponent extends HTMLElement {

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
        // this.shadow.appendChild(styles.cloneNode(true));
        // this.root = this.shadow.appendChild(template.content.cloneNode(true).firstChild as HTMLElement);
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
    connectedCallback() {
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

if (!customElements.get('entry-component')) {
    customElements.define('entry-component', EntryComponent);
}
