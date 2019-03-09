export interface Entry {
    _id: string;
    title: string;
    link: string;
    date: string;
    category: {
        _id: string;
        name: string;
    }
}
