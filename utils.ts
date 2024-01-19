// https://stackoverflow.com/a/12034334/228885
function escapeHtml(s: string) {
  const entityMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };

  return String(s).replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
}

function range(n: number, customizer = (i: number) => i) {
  return Array.from(Array(n), (_, i) => customizer(i));
}

function repeat(s: (i: number) => string, amount: number) {
  return Array.from(new Array(amount), (_, i) => s(i));
}

export { escapeHtml, range, repeat };
