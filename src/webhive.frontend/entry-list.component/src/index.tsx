import './entry-list.component';

addEventListener('navcomponent.connected.callback', event => {
    event.target.addItem('/', 'Home');
});

addEventListener('application.start', event => {
    const router = event.detail.router;
    const [rootRoutes] = event.detail.routes;
    const [appRoutes] = rootRoutes.slice(-1);
    appRoutes.unshift(['/', EntryList]);
}, { once: true });

function EntryList() {
    const entryList = document.createElement('entry-list-component');
    entryList.innerHTML = 'Loading...';
    return entryList;
}
