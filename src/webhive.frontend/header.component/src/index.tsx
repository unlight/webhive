import './header.component';
import createLoadRemoteModule, { createRequires } from '@paciolan/remote-module-loader';

const remoteModuleLoader = createLoadRemoteModule();

window.addEventListener('route.transition.end', async (event: any) => {
    const { app } = event.detail;
    const { h } = await remoteModuleLoader('/h-document-element.js');
    app.querySelector('#header').append(<header-component />);
});
