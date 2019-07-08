import * as loadScript from '@shinin/load-script';

// todo: tsx create
export function App({ children }) {
    return `
        <header-component></header-component>
        <nav-component></nav-component>
        ${children}`;
};
