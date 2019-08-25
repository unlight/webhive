import { EntryListComponent } from './entry-list.component';
import { Entry } from './entry';

export class EntryListService {

    // todo: one abort signal for all

    constructor(
        private host: EntryListComponent,
    ) { }

    async find({ q }): Promise<Entry[]> {
        let url = '/api/entry';
        const params = new URLSearchParams();
        if (q) {
            params.set('q', q);
        }
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        const query = params.toString();
        if (query) {
            url += '?' + query;
        }
        // todo: get from props
        return fetch(url, requestOptions)
            .then(response => response.json());
    }

}
