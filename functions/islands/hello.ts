import { islandTemplate } from "../../templates/vanilla.ts";
import { escapeHtml } from "../../utils.ts";

export async function onRequest({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get("value");

  if (!value) {
    return new Response(undefined, { status: 404 });
  }

  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  return new Response(islandTemplate(escapeHtml(value)), {
    status: 200,
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
