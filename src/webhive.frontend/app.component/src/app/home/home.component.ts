import * as loadScript from '@shinin/load-script';

export const Home = props => {
    // todo: fix me
    loadScript('entry-list.js');
    return `<entry-list-component></entry-list-component>`;
};
