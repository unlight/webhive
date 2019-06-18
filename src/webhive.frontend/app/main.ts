import 'a-wc-router/src/router';
import { NamedRouting } from 'a-wc-router/src/named-routing';
import * as loadScript from '@shinin/load-script';
import './style.css';

NamedRouting.importCustomElement = async (importSrc, tagName) => {
    if (importSrc && customElements.get(tagName) === undefined) {
        await loadScript(importSrc);
    }
};

loadScript('header.js');
loadScript('nav.js');
