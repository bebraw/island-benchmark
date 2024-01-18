import http from "http";
import process from "process";
import { onRequest } from "./functions/ssr/index.ts";

const port = process.env["PORT"] || 8080;

http
  .createServer(async (_, response) => {
    // Convert a Response object to something Node can understand
    const res = await onRequest();
    const text = await res.text();

    // Alternative way to get headers from a Response
    // JSON.stringify(Object.fromEntries(res.headers));
    response.writeHead(res.status, {
      "content-type": "text/html;charset=UTF-8",
    });
    response.end(text);
  })
  .listen(port);
console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
