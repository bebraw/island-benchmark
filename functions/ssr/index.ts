import { baseTemplate } from "../../templates/vanilla.ts";

export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  // TODO: Make the contents of this page match the islands one
  return new Response(
    await baseTemplate({
      base: "/ssr/",
      title: "SSR test",
      content: "SSR test",
    }),
    {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  );
}
