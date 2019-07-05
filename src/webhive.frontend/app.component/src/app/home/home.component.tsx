import * as loadScript from '@shinin/load-script';
import { h } from 'preact';

export function Home(props) {
    // todo: fix me, convert to loadable component
    loadScript('entry-list.js');
    return <entry-list-component></entry-list-component>;
};
