import { EntryListComponent } from './entry-list.component';

export class EntryListService {

    constructor(
        private host: EntryListComponent,
    ) { }

    async find() {
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        // todo: get from props
        return fetch('http://localhost:3000/entry', requestOptions)
            .then(response => response.json());
    }

}
