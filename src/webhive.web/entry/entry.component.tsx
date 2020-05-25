import { Entry } from './entry';
import h from 'vhtml';

export function EntryComponent({ entry }: { entry: Entry }) {
    return (
        <div class="entry">
            <span class="entry__category">{entry.category.name}</span>
            <span>
                <a href={entry.link} target="_blank">
                    {entry.title}
                </a>
            </span>
        </div>
    );
}
