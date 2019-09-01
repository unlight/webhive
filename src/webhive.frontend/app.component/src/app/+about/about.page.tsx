// @ts-ignore
import { h } from /* webpackIgnore: true */ '//unpkg.com/h-document-element?module';

export function AboutPage(props) {
    return <div>
        <h2>About</h2>
        <p>This MicroFrontend experiment was built with:</p>
        <ol>
            <li>Core: TypeScript, WebComponents, <a href="https://github.com/KidkArolis/space-router">space-router</a>, <a href="https://github.com/lukeed/dimport">dimport</a></li>
            <li>Search Page: <a href="https://github.com/geocine/custom-elements-ts">custom-elements-ts</a> (wrapper around web component)</li>
            <li>Home (Entry List): preact</li>
            <li>Header, Nav: Plain web component</li>
        </ol>
        <p>
            In a process I had to create <a href="https://github.com/unlight/static-import-webpack-plugin">webpack plugin</a> which helps generate Native EcmaScript modules.
        </p>
        <p>
        Source code can be found at <a href="https://github.com/unlight/webhive">Github</a>.
        </p>
    </div>;
}

addEventListener('navcomponent.connected.callback', (event: any) => {
    event.target.addItem('/about', 'About');
});
