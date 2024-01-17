import { baseTemplate } from "../../templates/vanilla";

export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  return new Response(
    baseTemplate({
      base: "/islands/",
      title: "Islands test",
      content:
        '<island on:visible:load="/islands/hello"></island><script type="module" src="/islands/runtime"></script>',
    }),
    {
      status: 200,
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    }
  );
}
