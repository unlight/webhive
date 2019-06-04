import * as shininLoadScript from '@shinin/load-script';

export function loadScript(files: string[]) {
    return async (c: PageJS.Context, next) => {
        await Promise.all(files.map(file => shininLoadScript(file)));
        next();
    };
}
