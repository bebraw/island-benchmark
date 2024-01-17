import { loremIpsum } from "lorem-ipsum";

function baseTemplate({
  base,
  title,
  content,
}: {
  base: string;
  title: string;
  content: string;
}) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <base href="${base}" />
      <title>${title}</title>
    </head>
    <body>
      <main>
        <h1>${title}</h1>
        <div>${content}</div>
      </main>
    </body>
  </html>`;
}

function islandTemplate(value: string) {
  return `<div>Hello from the island of ${value}s! ${loremIpsum({ count: 10 })}</div>`;
}

export { baseTemplate, islandTemplate };
