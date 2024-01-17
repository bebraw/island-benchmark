import { onRequest } from "./functions/ssr/index.ts";

const port = Deno.env.get("PORT") || 8080;

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
Deno.serve({ port: Number(port) }, onRequest);
