import http from "http";
import process from "process";
import finalhandler from "finalhandler";
import Router from "router";
import { onRequest } from "./functions/ssr/index.ts";

const port = process.env["PORT"] || 8080;

const router = Router();
router.get("/ssr/", async (_, response) => {
  // Convert a Response object to something Node can understand
  const res = await onRequest();
  const text = await res.text();

  // Alternative way to get headers from a Response.
  // For some reason this doesn't work on cyclic.sh.
  // JSON.stringify(Object.fromEntries(res.headers));
  response.writeHead(res.status, {
    "content-type": "text/html;charset=UTF-8",
  });
  response.end(text);
});

http
  .createServer((req, res) => router(req, res, finalhandler(req, res)))
  .listen(port);

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
