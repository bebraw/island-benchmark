import { baseTemplate } from "../../templates/vanilla";

export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  return new Response(
    await baseTemplate({
      base: "/ssr/",
      title: "SSR",
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
