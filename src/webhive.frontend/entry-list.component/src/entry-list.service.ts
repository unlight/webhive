import { EntryListComponent } from './entry-list.component';

export class EntryListService {

    // todo: one abort signal for all

    constructor(
        private host: EntryListComponent,
    ) { }

    async find() {
        const requestOptions: RequestInit = {
            method: 'GET',
        };
        // todo: get from props
        return fetch('http://webhive.herokuapp.com/api/entry', requestOptions)
            .then(response => response.json());
    }

}
