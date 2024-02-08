import autocannon from "autocannon";

const targets = [
  "https://island-benchmark.pages.dev/ssr?amount=1000",
  "https://island-benchmark.pages.dev/islands/",
  "http://194.62.99.82:8080/ssr?amount=10",
  "http://194.62.99.82:8080/ssr?amount=100",
  "http://194.62.99.82:8080/ssr?amount=1000",
  "http://194.62.99.82:8080/islands/",
  // "https://island-benchmark.cyclic.app/ssr/",
  // "https://island-benchmark.cyclic.app/islands/",
];

async function main(targets, duration) {
  const results = await Promise.all(
    targets.map((url) => autocannon({ url, duration }))
  );

  function pickRow(key) {
    return results.map((result) => result.latency[key]);
  }

  console.log(`a,b,c,d,e,f,g
0.001,${pickRow("p0_001").join(",")}
0.01,${pickRow("p0_01").join(",")}
0.1,${pickRow("p0_1").join(",")}
1,${pickRow("p1").join(",")}
2.5,${pickRow("p2_5").join(",")}
10,${pickRow("p10").join(",")}
25,${pickRow("p25").join(",")}
50,${pickRow("p50").join(",")}
75,${pickRow("p75").join(",")}
90,${pickRow("p90").join(",")}
97.5,${pickRow("p97_5").join(",")}
99,${pickRow("p99").join(",")}
99.9,${pickRow("p99_9").join(",")}
99.99,${pickRow("p99_99").join(",")}
99.999,${pickRow("p99_999").join(",")}
100,${pickRow("max").join(",")}
`);
}

main(targets, 30);
