import { Entry } from './entry';
import * as h from 'vhtml';

export function EntryComponent({ entry }: { entry: Entry }) {
    return <div class="entry">
        {/*<span class="tag">JavaScript</span>*/} <span class="entry__title">{entry.title}</span> <a href={entry.link}>link</a>
    </div>;
}
