import { test } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";
import playwright from "playwright";
import { printCSV } from "./print-csv.ts";
import { printBoxPlot } from "./print-box-plot.ts";
import { printTable } from "./print-table.ts";
import { range } from "../utils.ts";

const AMOUNT_OF_RUNS = 10;

const thresholds = {
  performance: 50,
  accessibility: 50,
  "best-practices": 50,
  seo: 50,
  pwa: 10,
};

testSuites("server", "http://194.62.99.82:8080", [
  "islands?amount=1000",
  "ssr?amount=10",
  "ssr?amount=100",
  "ssr?amount=1000",
]);
testSuites("edge", "https://island-benchmark.pages.dev", [
  "islands?amount=1000",
  "ssr?amount=1000",
]);
test.afterAll(() => {
  printCSV(AMOUNT_OF_RUNS);
  printTable();
  printBoxPlot();
});

// The idea is to run similar test cases at the same time to avoid
// weirdness related to connectivity as connection speed may vary.
function testSuites(type: string, prefix: string, names: string[]) {
  range(AMOUNT_OF_RUNS).forEach((i) =>
    names.forEach((name) =>
      test(`${prefix}-${name ? name + " " : ""}audit index #${i + 1}`, () =>
        auditIndex(type, prefix, name, i + 1))
    )
  );
}

async function auditIndex(
  type: string,
  prefix: string,
  name: string,
  n: number
) {
  const port = 9222;
  const browser = await playwright["chromium"].launch({
    args: [`--remote-debugging-port=${port}`],
  });
  const page = await browser.newPage();
  await page.goto(`${prefix}/${name || ""}`);

  await playAudit({
    page,
    thresholds,
    reports: getReportsConfiguration(`${type}-${name}${name ? "-" : ""}${n}`),
    port,
  });

  await browser.close();
}

function getReportsConfiguration(prefix: string) {
  return {
    formats: { json: true, html: true, csv: true },
    name: prefix + "-audit",
    directory: "benchmark-output",
    // Test against mobile to throttle connection
    formFactor: "mobile",
  };
}
