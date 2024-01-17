# island-benchmark

This repository contains a simple benchmark of islands architecture against SSR on edge and SSR on an individual server.

## Edge server

0. `nvm use` to use the right version of Node
1. `npm install` to install dependencies
2. `npm start` to run the server

After that you should be able to access `localhost:3000` and paths (`/islands` and `/ssr`) behind it.

## TypeScript

TypeScript is used for the edge code (CloudFlare workers) and the setup has been derived from `wrangler init`.

## Playwright + Lighthouse

To generate Lighthouse results, run the following:

```
npm run playwright
```

You can see the summaries in the output (FCP in ms) as a CSV to copy to `main.tex`.

## Autocannon tests

Autocannon (req/s) tests are behind `autocannon:` namespace. Example.

```
npm run autocannon:islands-on-edge
npm run autocannon:ssr-on-edge
npm run autocannon:ssr
```

To run the whole suite that emits a CSV suitable for `main.tex`, use `npm run autocannon` and copy the output. Since each test takes about 30 seconds, expect running the whole suite to take roughly a minute and half.
