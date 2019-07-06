import * as loadScript from '@shinin/load-script';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export function Home(props) {
    // todo: fix me, convert to loadable component
    useEffect(() => {
        loadScript('entry-list.js');
    }, []);
    return <entry-list-component>Loading...</entry-list-component>;
};
