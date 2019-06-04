import page from 'page';
import loadScript from 'load-script';

page('/', async (context, next) => {
    document.body.innerText = 'main';
});
page('/about', load('./about.js'));
page('*', (context, next) => {
    document.body.innerText = 'NOT FOUND';
});
page();


function load(file: string) {
    return (c, next) => {
        debugger
        loadScript(file, err => {
            if (err) {
                throw err;
            }
            debugger;
        });
    };
}
