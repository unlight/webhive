import { createElement as h } from 'h-document-element';

const styles = document.createElement('style');
styles.textContent = require('./nav.component.css');

const template = document.createElement('template');
template.innerHTML = require('./nav.component.html');

export class NavComponent extends HTMLElement {

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
        this.shadow.appendChild(styles.cloneNode(true));
        this.shadow.appendChild(template.content.cloneNode(true) as Node);
    }

    /**
     * Invoked each time the custom element is appended into a document-connected element.
     * This will happen each time the node is moved, and may happen before the element's contents
     * have been fully parsed
     */
    connectedCallback() {
        this.shadow.addEventListener('click', this);
        this.dispatchEvent(new CustomEvent('navcomponent.connected.callback', { detail: {}, bubbles: true, composed: true }));
    }

    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     */
    disconnectedCallback() {
        this.shadow.removeEventListener('click', this);
    }

    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     * Which attributes to notice change for is specified in a static get observedAttributes method
     */
    attributeChangedCallback(name, oldValue, newValue) {

    }

    handleEvent(event: Event) {
        if (event.type === 'click' && event.target && (event.target as HTMLAnchorElement).nodeName === 'A') {
            const anchor = (event.target as HTMLAnchorElement);
            const detail = {
                url: anchor.getAttribute('href'),
            };
            dispatchEvent(new CustomEvent('route.navigate.push', { detail }));
            event.preventDefault();
        }
    }

    addItem(href: string, description: string) {
        this.shadow.querySelector('nav > ul').append(<li><a href={href}>{description}</a></li>);
    }
}

if (!customElements.get('nav-component')) {
    customElements.define('nav-component', NavComponent);
}
