export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  // TODO: Set up a simple island runtime
  return new Response("console.log('hello from island runtime')", {
    status: 200,
    headers: {
      "content-type": "text/javascript;charset=UTF-8",
    },
  });
}
