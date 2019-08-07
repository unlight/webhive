import './header.component';
import { createLoadRemoteModule, createRequires } from 'remote-module-loader';

const remoteModuleLoader = createLoadRemoteModule();

window.addEventListener('route.transition.end', async (event: any) => {
    const { app } = event.detail;
    const {h} = await remoteModuleLoader('//unpkg.com/h-document-element');
    app.querySelector('#header').append(<header-component />);
});
