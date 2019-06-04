export function documentBody(factory: () => string) {
    return (c: PageJS.Context, next: () => void) => {
        document.body.innerHTML = factory();
        next();
    };
}
