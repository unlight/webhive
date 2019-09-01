interface NavigatePushEventDetail {
    url: string;
    options?: NavigateSetEventDetail;
}

interface NavigateSetEventDetail {
    replace?: boolean;
    params?: any;
    query?: any;
    hash?: any;
}

export function isNavigatePushCustomEvent(event: any): event is CustomEvent<NavigatePushEventDetail> {
    return event.type === 'route.navigate.push' && event.detail && typeof event.detail.url === 'string';
}

export function isNavigateSetCustomEvent(event: any): event is CustomEvent<NavigatePushEventDetail> {
    return event.type === 'route.navigate.set' && event.detail != null;
}
