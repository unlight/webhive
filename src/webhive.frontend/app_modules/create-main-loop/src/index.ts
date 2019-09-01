const mainLoop = require('main-loop');
const create = require('virtual-dom/create-element');
const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');

export function createMainLoop(render: (state: any) => any) {
    return mainLoop([], render, {
        create,
        diff,
        patch,
    });
}
