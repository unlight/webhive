import 'a-wc-router/src/router';
import { NamedRouting } from 'a-wc-router/src/named-routing';
import * as loadScript from '@shinin/load-script';
NamedRouting.importCustomElement = async (importSrc, tagName) => {
    if (importSrc && customElements.get(tagName) === undefined) {
        await loadScript(importSrc);
    }
};
import './style.css';
