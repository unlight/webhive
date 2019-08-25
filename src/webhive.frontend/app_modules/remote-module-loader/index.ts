export function createLoadRemoteModule({ requires = defaultRequires, fetcher = requestFetcher } = {}) {
    return memoize(url =>
        fetcher(url).then((code: string) => {
            const exports = {};
            const module = { exports };
            new Function('require', 'module', 'exports', code)(requires, module, exports);
            return exports;
        })
    );
}

export function createRequires(dependencies) {
    return name => {
        if (!(name in (dependencies || {}))) {
            throw new Error(`Could not require '${name}'. '${name}' does not exist in dependencies.`);
        }
        return dependencies[name];
    }
}

function defaultRequires(name) {
    return () => {
        throw new Error(`Could not require '${name}'. The 'requires' function was not provided.`);
    };
}

function requestFetcher(url: string) {
    return fetch(url).then(r => r.text());
}

function memoize(func) {
    var cache = {};
    return x => {
        if (x in cache == false) {
            cache[x] = func(x);
        }
        return cache[x];
    };
}
