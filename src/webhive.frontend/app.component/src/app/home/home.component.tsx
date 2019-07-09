import * as loadScript from '@shinin/load-script';
import { createElement as h } from 'tsx-create-html-element';

export function Home(props) {
    // todo: fix me, convert to loadable component
    loadScript('entry-list.js');
    return <entry-list-component>Loading...</entry-list-component>;
};
