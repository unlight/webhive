## TODO
import { NamedRouting } from 'a-wc-router/src/named-routing';
NamedRouting.importCustomElement = async (importSrc, tagName) => {
    if (importSrc && customElements.get(tagName) === undefined) {
        await loadScript(importSrc);
    }
};
