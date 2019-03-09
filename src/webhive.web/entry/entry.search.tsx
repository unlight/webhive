import { Entry } from '../entry/entry';
import { EntryComponent } from '../entry/entry.component';
import { Nav } from '../layout/nav';
import { Head } from '../layout/head';
import * as h from 'vhtml';

export async function entrySearch({ entries, q }: { entries: Entry[], q: string }) {
    return <html>
        <Head />
        <body>
            <main>
                <h1>Search</h1>
                <Nav></Nav>
                <form method="get">
                    <input type="text" placeholder="Search" name="q" value={q} autocomplete="off" />
                    <input type="submit" value="Go" />
                </form>
                {entries.map((entry, index) => <EntryComponent entry={entry}></EntryComponent>)}
            </main>
        </body>
    </html>;
}
