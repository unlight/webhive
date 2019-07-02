export function App({ children }) {
    return `<div className="App">
        <div className="Nav">
            <a href="/">Home</a>
            <a href="/channels">Channels</a>
            <a href="/channels/5">Channel 5</a>
        </div>
        <div className="Content">${children}</div>
    </div>`;
};
