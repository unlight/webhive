import * as loadScript from '@shinin/load-script';

export function Home(props) {
    // todo: fix me
    loadScript('entry-list.js');
    return `<entry-list-component></entry-list-component>`;
};
