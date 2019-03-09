import { Entry } from './entry';
import * as h from 'vhtml';

export function EntryComponent({ entry }: { entry: Entry }) {
    return <div class="entry">
        <span class="entry__category">{entry.category.name}</span> <a href={entry.link}>{entry.title}</a>
    </div>;
}
