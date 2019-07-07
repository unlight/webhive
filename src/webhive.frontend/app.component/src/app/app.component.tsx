import * as loadScript from '@shinin/load-script';
import { h, Fragment } from 'preact';

export function App({ children }) {
    return <Fragment>
        <header-component></header-component>
        <nav-component></nav-component>
        {children}
    </Fragment>;
};
