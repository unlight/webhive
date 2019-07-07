# webhive.frontend

## API

### Attributes

### Properties

### Events

### Slots

### CSS Variables

## TODO
* 
* [DONT (FOUT)] nav component try use, link rel
* analize
* preact move to app only
```
import { NamedRouting } from 'a-wc-router/src/named-routing';
NamedRouting.importCustomElement = async (importSrc, tagName) => {
    if (importSrc && customElements.get(tagName) === undefined) {
        await loadScript(importSrc);
    }
};
```
