import { Entry } from './entry';
import * as h from 'vhtml';

export function EntryComponent({ entry }: { entry: Entry }) {
    return <div class="entry">
        <span class="entry__category">{entry.category.name}</span>
        <span>
            <a href={entry.link}>{entry.title}</a> { }
            <a class="entry__google" href={`http://google.com/search?q=${encodeURIComponent(entry.title)}`}>[G]</a>
        </span>
    </div>;
}
