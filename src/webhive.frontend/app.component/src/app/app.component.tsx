import * as loadScript from '@shinin/load-script';
import { h, Fragment } from 'preact';

export function App({ children }) {
    return <Fragment>
        <header-component></header-component>
        <nav-component></nav-component>
        {/*<div>
            <a href="/channels">Channels</a> <a href="/channels/5">Channel 5</a>
        </div>*/}
        {children}
    </Fragment>;
};
