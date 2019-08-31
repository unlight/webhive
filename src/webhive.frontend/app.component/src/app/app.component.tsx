import { h } from /* webpackIgnore: true */ '//unpkg.com/h-document-element?module';

export function App({ children }) {
    return <main>
        <div id="header"></div>
        <div id="nav"></div>
        <div id="body">{children}</div>
    </main>;
};
