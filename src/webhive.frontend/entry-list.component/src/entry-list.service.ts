import { EntryListComponent } from './entry-list.component';
import { Entry } from './entry';

export class EntryListService {

    // todo: one abort signal for all

    constructor(
        private host: EntryListComponent,
    ) { }

    async find(): Promise<Entry[]> {
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        // todo: get from props
        return fetch('/api/entry', requestOptions)
            .then(response => response.json());
    }

}
