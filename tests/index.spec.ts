import { test } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";
import playwright from "playwright";
import { getReportsConfiguration, printCSV, printTable } from "./utils.ts";
import { range } from "../utils.ts";

const AMOUNT_OF_RUNS = 10;

const thresholds = {
  performance: 50,
  accessibility: 50,
  "best-practices": 50,
  seo: 50,
  pwa: 10,
};

testSuites("server", "http://194.62.99.82:8080", ["islands", "ssr"]);
testSuites("edge", "https://island-benchmark.pages.dev", ["islands", "ssr"]);
test.afterAll(() => {
  printCSV(AMOUNT_OF_RUNS);
  printTable();
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
