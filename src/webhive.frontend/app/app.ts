import * as loadScript from '@shinin/load-script';

export const Home = props => {
    loadScript('entry-list.js');
    return `<entry-list-component></entry-list-component>`;
};
export const Channels = props => `<div>Channels</div>`;
export const Channel = props => `<div>Channel ${props.params.id}</div>`;
export const NotFound = props => `<div>Not Found</div>`;

export function App({ children }) {
    return `
        <header-component></header-component>
        <nav-component></nav-component>
        ${children}
    `;
};
