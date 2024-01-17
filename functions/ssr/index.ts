import { baseTemplate, islandTemplate } from "../../templates/vanilla.ts";
import { repeat } from "../../utils.ts";

export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  // Here all islands are prerendered instantly and there's no specific additional logic related to them
  const island = (i: number) =>
    `<div style="height: 10em; background-color: #${(1000 + i * 10).toString(16)}; margin: 1em; padding: 1em;">
      ${islandTemplate(i.toString())}
    </div>`;

  return new Response(
    await baseTemplate({
      base: "/ssr/",
      title: "SSR test",
      content: repeat(island, 1000).join(""),
    }),
    {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  );
}
