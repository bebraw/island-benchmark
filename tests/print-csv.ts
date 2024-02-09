import { readAudits } from "./read-audits.ts";

function printCSV(amountOfRuns: number) {
  // Check the output JSON files for possible audits
  const auditTypes = [
    "first-contentful-paint",
    "server-response-time",
    "interactive",
  ];

  auditTypes.forEach((auditType) => {
    const edgeSsrFCPs = readAudits("edge-ssr?amount=1000-", auditType);
    const edgeIslandsFCPs = readAudits("edge-islands?amount=1000-", auditType);
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

function range(n: number) {
  return Array.from(Array(n), (_, i) => i);
}

export { printCSV };
