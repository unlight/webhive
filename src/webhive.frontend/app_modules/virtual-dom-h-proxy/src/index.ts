const vdomh = require('virtual-dom/h');

export function h(type, props, ...children) {
    return vdomh(type, props, [children]);
}
