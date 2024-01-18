function range(n: number, customizer = (i: number) => i) {
  return Array.from(Array(n), (_, i) => customizer(i));
}

function repeat(s: (i: number) => string, amount: number) {
  return Array.from(new Array(amount), (_, i) => s(i));
}

export { range, repeat };
