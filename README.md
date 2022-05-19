## Development

```sh
docker run -it -p 27017:27017 --rm mongo
npm run dev:api
set API_URL=http://localhost:3000
npm run harvest -- --ant=ant1
```

## TODO

- Create indexes
- BEM names for css classes
- createEntry: use ctx.throw to throw errrors (errorlings?)
- pagination
- graphql
