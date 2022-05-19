## Development

```sh
docker run -it -p 27017:27017 --rm mongo
npm run dev:api
set API_URL=http://localhost:3000
set API_TOKEN=
npm run harvest -- --ant=ant1
```

## TODO

-   add https://event-driven.io/rss.xml
-   Create indexes
-   BEM names for css classes
-   createEntry: use ctx.throw to throw errrors (errorlings?)
-   pagination
-   graphql
