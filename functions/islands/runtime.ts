export async function onRequest() {
  // Wait 100ms to simulate load
  await new Promise((r) => setTimeout(r, 100));

  return new Response(runtimeCode, {
    status: 200,
    headers: {
      "content-type": "text/javascript;charset=UTF-8",
    },
  });
}

const runtimeCode = `
console.log('hello from an island runtime');

const islands = document.getElementsByTagName("island");
for (let i = 0; i < islands.length; i++) {
  const island = islands[i];
  const markupToLoad = island.getAttribute('on:visible:load');

  if (markupToLoad) {
    // The idea is to use an IntersectionObserver to detect when an island
    // is visible in the view and then fetch markup to inject within the island.
    // Furthermore, in the current design this should occur only once.
    const observer = new IntersectionObserver(
      async (entries) => {
        // https://stackoverflow.com/questions/53214116/intersectionobserver-callback-firing-immediately-on-page-load
        const intersected = entries.some((entry) => {
          return entry.intersectionRatio > 0;
        });

        if (!intersected) {
          return;
        }

        observer.unobserve(island);

        const markup = await fetch(markupToLoad).then(res => res.text());
        island.innerHTML = markup;
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    observer.observe(island);
  }
}`;
