# Faker-api
Uses Faker.js to create a local API

To run the api at http://localhost:3000/api use

```sh
npm run start
```

To generate \<count\> values use http://localhost:3000/api/\<count\>

Requires Node.js 22.12 or newer. Run `npm ci` before starting. `npm run dev` uses Node's native file watcher; this CommonJS application no longer needs Babel or nodemon. `npm test` checks the API response shape, count behavior, and CORS headers. Runtime dependencies are installed for production deployments as well.
