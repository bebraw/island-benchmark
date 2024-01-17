export async function onRequest({ request }: { request: Request }) {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get("value");

  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  // Note that this isn't XSS safe so take care!
  return new Response(`<div>Hello from the island of ${value}s!</div>`, {
    status: 200,
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
