import { readAudits } from "./read-audits.ts";

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
    const edgeIslandsValues = readAudits(
      "edge-islands?amount=1000-",
      auditType
    );
    const ssrTenValues = readAudits("server-ssr?amount=10-", auditType);
    const ssrHundredValues = readAudits("server-ssr?amount=100-", auditType);
    const ssrThousandValues = readAudits("server-ssr?amount=1000-", auditType);
    const ssrIslandsValues = readAudits(
      "server-islands?amount=1000-",
      auditType
    );

    calculatedRows.edgeSsr[auditType] = {
      p25: p25(edgeSsrValues),
      p75: p75(edgeSsrValues),
      median: median(edgeSsrValues),
      average: average(edgeSsrValues),
    };
    calculatedRows.edgeIslands[auditType] = {
      p25: p25(edgeIslandsValues),
      p75: p75(edgeIslandsValues),
      median: median(edgeIslandsValues),
      average: average(edgeIslandsValues),
    };
    calculatedRows.serverTenSsr[auditType] = {
      p25: p25(ssrTenValues),
      p75: p75(ssrTenValues),
      median: median(ssrTenValues),
      average: average(ssrTenValues),
    };
    calculatedRows.serverHundredSsr[auditType] = {
      p25: p25(ssrHundredValues),
      p75: p75(ssrHundredValues),
      median: median(ssrHundredValues),
      average: average(ssrHundredValues),
    };
    calculatedRows.serverThousandSsr[auditType] = {
      p25: p25(ssrThousandValues),
      p75: p75(ssrThousandValues),
      median: median(ssrThousandValues),
      average: average(ssrThousandValues),
    };
    calculatedRows.serverIslands[auditType] = {
      p25: p25(ssrIslandsValues),
      p75: p75(ssrIslandsValues),
      median: median(ssrIslandsValues),
      average: average(ssrIslandsValues),
    };
  });

  function getRow(name: string, property: string) {
    return `${name} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].p25
    )} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].p75
    )} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].median
    )} & ${Math.round(
      calculatedRows[property]["first-contentful-paint"].average
    )} & ${Math.round(
      calculatedRows[property]["server-response-time"].p25
    )} & ${Math.round(
      calculatedRows[property]["server-response-time"].p75
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
    "\nFCP (p25, p75, median, average), SRT (first p25, p75, median, average)"
  );
  console.log(rows.map((row) => getRow(row[0], row[1])).join(""));
}

// The assumption is that the values are already sorted
function p25(values: number[]) {
  return values[Math.floor(values.length * 0.25)];
}

// The assumption is that the values are already sorted
function p75(values: number[]) {
  return values[Math.floor(values.length * 0.75)];
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

export { printTable };
