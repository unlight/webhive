export function dispatchEvent<T>(type: string, eventInitDict?: CustomEventInit<T>) {
    const event = new CustomEvent(type, eventInitDict);
    window.dispatchEvent(event);
}
