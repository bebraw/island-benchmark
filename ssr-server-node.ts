import http from "http";
import process from "process";

// TODO
// import { onRequest } from "./functions/ssr/index.ts";

const port = process.env["PORT"] || 8080;

http
  .createServer((_, resp) => {
    resp.writeHead(200, {
      "content-type": "text/plain",
    });
    resp.end("Hello world");
  })
  .listen(port);
console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
