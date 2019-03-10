export type Ant = {
    name: string;
    target: string;
    defaultCategory: string;
};

export const ants: Ant[] = [
    { name: 'javascriptkicks', target: 'https://javascriptkicks.com/feeds/rss', defaultCategory: 'JavaScript' },
    { name: 'codeburst', target: 'https://codeburst.io/feed', defaultCategory: 'Code' },
    { name: 'rutracker1565', target: 'http://feed.rutracker.org/atom/f/1565.atom', defaultCategory: 'Video' },
    { name: '2ality', target: 'http://feeds.feedburner.com/2ality', defaultCategory: 'JavaScript' },
    { name: 'echojs', target: 'http://www.echojs.com/rss', defaultCategory: 'JavaScript' },
];
