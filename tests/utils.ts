import fs from "fs";
import { glob } from "glob";

function getReportsConfiguration(prefix: string) {
  return {
    formats: { json: true, html: true, csv: true },
    name: prefix + "-audit",
    directory: "benchmark-output",
    // Test against mobile to throttle connection
    formFactor: "mobile",
  };
}

function printCSV(amountOfRuns: number) {
  // Check the output JSON files for possible audits
  const auditTypes = [
    "first-contentful-paint",
    "server-response-time",
    "interactive",
  ];

  auditTypes.forEach((auditType) => {
    const edgeSsrFCPs = readAudits("edge-ssr?amount=1000-", auditType);
    const edgeIslandsFCPs = readAudits("edge-islands-", auditType);
    const serverSsrTenFCPs = readAudits("server-ssr?amount=10-", auditType);
    const serverSsrHundredFCPs = readAudits(
      "server-ssr?amount=100-",
      auditType
    );
    const serverSsrThousandFCPs = readAudits(
      "server-ssr?amount=1000-",
      auditType
    );
    const serverIslandsFCPs = readAudits("server-islands-", auditType);

    function pickRow(i: number) {
      return `${i + 1},${edgeSsrFCPs[i]},${edgeIslandsFCPs[i]},${serverSsrTenFCPs[i]},${serverSsrHundredFCPs[i]},${serverSsrThousandFCPs[i]},${serverIslandsFCPs[i]}`;
    }

    console.log(`\nAudit type: ${auditType}`);
    // This output should go to main.tex
    console.log(`a,b,c,d,e,f,g,h,i,j,k
${range(amountOfRuns)
  .map((i) => pickRow(i))
  .join("\n")}`);
  });
}

// TODO: This code could be condensed a lot
function printTable() {
  // Check the output JSON files for possible audits
  const auditTypes = [
    "first-contentful-paint",
    // Skip TTI as it seems to follow FCP closely
    // "interactive",
    "server-response-time",
  ];
  const calculatedRows: Record<
    string,
    { firstRun: number; median: number; average: number }
  > = {
    edgeSsr: {},
    edgeIslands: {},
    serverTenSsr: {},
    serverHundredSsr: {},
    serverThousandSsr: {},
    serverIslands: {},
  };

  auditTypes.forEach((auditType) => {
    const edgeSsrValues = readAudits("edge-ssr?amount=1000-", auditType);
    const edgeIslandsValues = readAudits("edge-islands-", auditType);
    const ssrTenValues = readAudits("server-ssr?amount=10-", auditType);
    const ssrHundredValues = readAudits("server-ssr?amount=100-", auditType);
    const ssrThousandValues = readAudits("server-ssr?amount=1000-", auditType);
    const ssrIslandsValues = readAudits("server-islands-", auditType);

    calculatedRows.edgeSsr[auditType] = {
      firstRun: edgeSsrValues[0],
      median: median(edgeSsrValues.slice(1)),
      average: average(edgeSsrValues.slice(1)),
    };
    calculatedRows.edgeIslands[auditType] = {
      firstRun: edgeIslandsValues[0],
      median: median(edgeIslandsValues.slice(1)),
      average: average(edgeIslandsValues.slice(1)),
    };
    calculatedRows.serverTenSsr[auditType] = {
      firstRun: ssrTenValues[0],
      median: median(ssrTenValues.slice(1)),
      average: average(ssrTenValues.slice(1)),
    };
    calculatedRows.serverHundredSsr[auditType] = {
      firstRun: ssrHundredValues[0],
      median: median(ssrHundredValues.slice(1)),
      average: average(ssrHundredValues.slice(1)),
    };
    calculatedRows.serverThousandSsr[auditType] = {
      firstRun: ssrThousandValues[0],
      median: median(ssrThousandValues.slice(1)),
      average: average(ssrThousandValues.slice(1)),
    };
    calculatedRows.serverIslands[auditType] = {
      firstRun: ssrIslandsValues[0],
      median: median(ssrIslandsValues.slice(1)),
      average: average(ssrIslandsValues.slice(1)),
    };
  });

  function getRow(name: string, property: string) {
    return `${name} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].firstRun
    )} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].median
    )} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].average
    )} & ${Math.round(
      calculatedRows[property]["server-response-time"].firstRun
    )} & ${Math.round(
      calculatedRows[property]["server-response-time"].median
    )} & ${Math.round(
      calculatedRows[property]["server-response-time"].average
    )} \\\\\n`;
  }

  const rows = [
    ["Edge SSR (1000)", "edgeSsr"],
    ["Edge Islands", "edgeIslands"],
    ["Server SSR (10)", "serverTenSsr"],
    ["Server SSR (100)", "serverHundredSsr"],
    ["Server SSR (1000)", "serverThousandSsr"],
    ["Server Islands", "serverIslands"],
  ];

  console.log(
    "\nFCP (first run, median, average), SRT (first run, median, average)"
  );
  console.log(rows.map((row) => getRow(row[0], row[1])).join(""));
}

function median(values: number[]) {
  const amount = values.length;

  if (amount % 2) {
    // For example, length is 5 -> pick 2nd from a zero-indexed array
    return values[Math.floor(amount / 2)];
  }

  // For example, length is 6 -> pick average of indices 2 and 3
  return (
    (values[Math.floor(amount / 2)] + values[Math.floor(amount / 2) - 1]) / 2
  );
}

function average(values: number[]) {
  const sum = values.reduce((a, b) => a + b, 0);

  return sum / values.length;
}

function readAudits(pageType: string, auditType: string) {
  const files = glob.sync("benchmark-output/" + pageType + "*-audit.json");

  const audits = files.map((f) => fs.readFileSync(f)).map((d) => JSON.parse(d));

  return audits.map((a) => a["audits"][auditType]["numericValue"]);
}

function range(n: number) {
  return Array.from(Array(n), (_, i) => i);
}

export { getReportsConfiguration, printCSV, printTable, readAudits };
