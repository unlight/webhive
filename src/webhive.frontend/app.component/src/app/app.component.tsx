import * as loadScript from '@shinin/load-script';
import { createElement as h } from 'h-document-element';

export function App({ children }) {
    return <main>
        <div id="header"></div>
        <div id="nav"></div>
        <div id="body">{children}</div>
    </main>;
};
