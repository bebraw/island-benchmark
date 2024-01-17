import { baseTemplate } from "../../templates/vanilla.ts";
import { repeat } from "../../utils.ts";

export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  // Without predefined styling, on:visible does not make much sense.
  // Note that the way we define styling is slightly inefficient as it
  // would be better to extract the styles to a stylesheet and go through
  // classes instead.
  const island = (i: number) =>
    `<div style="min-height: 10em; background-color: #${(1000 + i * 10).toString(16)}; margin: 1em; padding: 1em;"
      data-island
      on:visible:load="/islands/hello?value=${i}">
    </div>`;
  const runtime = '<script type="module" src="/islands/runtime"></script>';

  return new Response(
    baseTemplate({
      base: "/islands/",
      title: "Islands test",
      // Render thousand islands and a runtime
      content: repeat(island, 1000).join("") + runtime,
    }),
    {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  );
}
