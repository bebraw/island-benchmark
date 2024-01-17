export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  return new Response("<div>Hello from an island</div>", {
    status: 200,
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
