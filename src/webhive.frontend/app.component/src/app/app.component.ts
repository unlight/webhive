import * as loadScript from '@shinin/load-script';

export function App({ children }) {
    return `
        <header-component></header-component>
        <nav-component></nav-component>
        <div><a href="/channels">Channels</a> <a href="/channels/5">Channel 5</a></div>
        ${children}
    `;
};
