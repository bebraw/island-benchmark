import http from "http";
import process from "process";
import finalhandler from "finalhandler";
import Router from "router";
import { onRequest as ssrOnRequest } from "./functions/ssr/index.ts";
import { onRequest as islandsOnRequest } from "./functions/islands/index.ts";
import { onRequest as helloOnRequest } from "./functions/islands/hello.ts";
import { onRequest as runtimeOnRequest } from "./functions/islands/runtime.ts";

const port = process.env["PORT"] || 8080;

const router = Router();
router.get("/ssr/", async (request, response) => {
  // Convert a Response object to something Node can understand
  const res = await ssrOnRequest({ request });
  const text = await res.text();

  // Alternative way to get headers from a Response.
  // For some reason this doesn't work on cyclic.sh.
  // JSON.stringify(Object.fromEntries(res.headers));
  response.writeHead(res.status, {
    "content-type": "text/html;charset=UTF-8",
  });
  response.end(text);
});
router.get("/islands/", async (request, response) => {
  // Convert a Response object to something Node can understand
  const res = await islandsOnRequest({ request });
  const text = await res.text();

  response.writeHead(res.status, {
    "content-type": "text/html;charset=UTF-8",
  });
  response.end(text);
});
router.get("/islands/hello/", async (request, response) => {
  // Convert a Response object to something Node can understand
  const res = await helloOnRequest({ request });
  const text = await res.text();

  response.writeHead(res.status, {
    "content-type": "text/html;charset=UTF-8",
  });
  response.end(text);
});
router.get("/islands/runtime/", async (_, response) => {
  // Convert a Response object to something Node can understand
  const res = await runtimeOnRequest();
  const text = await res.text();

  response.writeHead(res.status, {
    "content-type": "text/javascript;charset=UTF-8",
  });
  response.end(text);
});

http
  .createServer((req, res) => router(req, res, finalhandler(req, res)))
  .listen(port);

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
