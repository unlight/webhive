import page from 'page';

page('/', (context, next) => {
    document.body.innerText = 'main';
});
page('*', (context, next) => {
    document.body.innerText = 'NOT FOUND';
});
page();
