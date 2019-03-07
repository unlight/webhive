import { Entry } from '../entry/entry';
import { EntryComponent } from '../entry/entry.component';
import { DayTitle } from './day-title.component';
import { Head } from '../layout/head';
import { Nav } from '../layout/nav';
import * as h from 'vhtml';

export async function entryIndex({ entries }: { entries: Entry[] }) {
    const [firstEntryDate] = entries;
    return <html>
        <Head />
        <body>
            <main>
                <h1>Web Hive</h1>
                <Nav></Nav>
                {entries.map((entry, index) => [
                    <DayTitle previousDate={entries[index - 1] && entries[index - 1].date}
                        currentDate={entry.date}></DayTitle>,
                    <EntryComponent entry={entry}></EntryComponent>
                ])}
            </main>
        </body>
    </html>;
}
