# webhive.frontend

## API

### Attributes

### Properties

### Events

### Slots

### CSS Variables

## Development


## TODO
* entry-list component replace by preact X
* component mustbe compiled to esm modules
* webpack create esmodules
* create own cdn system unpkg
  - proxy semver https://github.com/npm/node-semver#ranges-1 
* rework search.page (it depends on entry-list component)
  - after submit fired redirect to home where q handler by entry list component
* request flicking for search page
* lazy load search
* create loadable component
* move h-document-element to global bundle
* cache busting
* global modules wich can be used by plugins
* extract mini css plugin

## NOTES
* https://github.com/WebReflection/import.js does not work (so dimport) as expected
