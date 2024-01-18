import http from "http";
import process from "process";
import { onRequest } from "./functions/ssr/index.ts";

const port = process.env["PORT"] || 8080;

http
  .createServer(async (_, response) => {
    // Convert a Response object to something Node can understand
    const res = await onRequest();
    const text = await res.text();

    response.writeHead(
      res.status,
      JSON.stringify(Object.fromEntries(res.headers))
    );
    response.end(text);
  })
  .listen(port);
console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
