/* eslint-disable @typescript-eslint/tslint/config */
import * as expect from 'expect';
import { harvestResource, createEntry, entryLink, entryDate } from './harvest.functions';
import { createReadStream } from 'fs';
import * as intoStream from 'into-stream';

describe('harvest functions', () => {

    it('resource smoke test', () => {
        expect(harvestResource).toBeTruthy();
    });

    it('harvestResource playground', async () => {
        const stream = intoStream(`<?xml version="1.0"?>
<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>javascriptkicks.com</title>
    <link>https://javascriptkicks.com/</link>
    <description>The latest published stories from JavaScriptKicks.com</description>
    <language>en-us</language>
    <copyright>DotNetKicks LLC</copyright>
    <generator>javascriptkicks.com</generator>
    <item>
      <guid isPermaLink="false">stories/157197</guid>
      <link>https://javascriptkicks.com/r/157197?url=https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/</link>
      <a10:author>
        <a10:name>Aurelia</a10:name>
        <a10:uri>https://javascriptkicks.com/@AureliaEffect</a10:uri>
      </a10:author>
      <title>How do we</title>
      <description>You may have noticed that most other frameworks don't have HoCs, render props or anything like React.Children. These account for a lot the differences between React and other frameworks. How would you solve these use cases if you had to switch to [other framework]?</description>
      <a10:updated>2019-03-01T18:10:25Z</a10:updated>
    </item>
  </channel>
</rss>
`);
        const result = await harvestResource({ stream });
        expect(result).toBeAn(Array);
        expect(result.length).toBeGreaterThan(0);
        const [item] = result;
        // console.log("item", item);
        expect(item).toBeTruthy();
        expect(item.title).toBe('How do we');
        const entry = createEntry(item);
        // console.log("entry", entry);
    });

    it('item link', () => {
        expect(entryLink('https://javascriptkicks.com/r/157197?url=https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/')).toEqual('https://aurelia.io/blog/2019/03/01/how-do-we-react-part-2/');
    });

    // it('entry date', () => {
    //     entryDate();
    // });

});
