function repeat(s: (i: number) => string, amount: number) {
  return Array.from(new Array(amount), (_, i) => s(i));
}

export { repeat };
