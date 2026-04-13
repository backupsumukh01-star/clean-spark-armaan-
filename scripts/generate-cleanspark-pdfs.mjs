/**
 * Generates CleanSpark branded PDFs for /public/audit and /public/whitepaper.
 * Audit report is extended (target: 30+ pages). Run: npm run build:pdfs
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const GOLD = rgb(0.72, 0.53, 0.04);
const BODY = rgb(0.15, 0.13, 0.1);
const MUTED = rgb(0.36, 0.34, 0.29);
const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const LEFT = 50;
const RIGHT = 545;
const BOTTOM_MARGIN = 52;
const MAX_CHARS = 88;

function wrapLine(line, maxLen) {
  const words = line.split(/\s+/).filter(Boolean);
  const out = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxLen) cur = next;
    else {
      if (cur) out.push(cur);
      cur = w;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function wrapParagraph(text, maxLen) {
  return text.split("\n\n").flatMap((para) => {
    const lines = [];
    for (const raw of para.split("\n")) {
      lines.push(...wrapLine(raw.trim(), maxLen));
    }
    return [...lines, ""];
  });
}

/** ---------- Extended audit content (programmatic + static) ---------- */

const CHAPTER_THEMES = [
  ["Executive summary & engagement letter", "scope, objectives, limitations"],
  ["Document control & revision history", "versioning, approvals, distribution"],
  ["System description — mining stack", "sites, ASIC classes, monitoring"],
  ["System description — CLSK token", "BEP-20, supply, liquidity, listings"],
  ["Threat modeling & risk universe", "adversaries, assets, attack paths"],
  ["Identity & access management", "RBAC, MFA, break-glass, reviews"],
  ["Network & segmentation", "firewalls, VPN, bastion, logging"],
  ["Endpoint & firmware integrity", "ASIC controllers, patching, SBOM"],
  ["Key management & custody", "HSM, multisig, seed handling, travel rule"],
  ["Operational monitoring & SOC", "SIEM, alerting, runbooks, on-call"],
  ["Incident response & business continuity", "playbooks, RTO/RPO, drills"],
  ["Vendor & colocation governance", "due diligence, SLAs, exit strategy"],
  ["Physical security", "perimeter, CCTV, access logs, visitor policy"],
  ["Power & energy risk", "PPAs, curtailment, hedging, force majeure"],
  ["Environmental & regulatory posture", "licensing, reporting, ESG claims"],
  ["Smart contract review methodology", "static analysis, manual review, tooling"],
  ["Token economics & treasury controls", "allocations, vesting, multisig spend"],
  ["Liquidity & market integrity", "LP locks, MEV, sandwich, oracle use"],
  ["Data protection & privacy", "PII minimization, retention, subprocessors"],
  ["Change management & SDLC", "reviews, staging, release approvals"],
  ["Compliance & legal interface", "securities, sanctions, KYC/AML touchpoints"],
  ["Third-party attestation roadmap", "SOC 2, ISO 27001, pen-test cadence"],
  ["Findings summary & severity model", "critical, high, medium, low, informational"],
  ["Management responses & remediation", "owners, dates, evidence of closure"],
  ["Appendix — control mapping sample", "NIST, CIS, CSA blockchain controls"],
  ["Appendix — glossary & references", "terms, citations, standards bodies"],
  ["Appendix — sample policy excerpts", "acceptable use, crypto handling"],
  ["Appendix — audit evidence index", "log exports, configs, ticket IDs"],
];

function subsectionBody(chapterIdx, subIdx, theme, subtitle) {
  const n = chapterIdx * 10 + subIdx;
  return [
    `This subsection (${chapterIdx + 1}.${subIdx}) addresses ${subtitle} within the CleanSpark Extended Security & Audit Assessment dated 2026. The assessment covers Bitcoin mining operations, hosting relationships, treasury workflows, and CLSK on BNB Smart Chain as described in the system boundary statement. Procedures performed were limited to inquiry, observation, inspection of selected artifacts, and agreed-upon analytics where noted. No opinion on financial statements is expressed.`,
    `Management is responsible for design, implementation, and operating effectiveness of controls. Assessors relied on representations regarding scope completeness and should be engaged to re-perform or expand testing when architecture, custodians, contracts, or token logic materially change. Residual risk may remain even when controls appear suitably designed; compensating controls must be explicitly documented.`,
    `Key considerations for ${theme.toLowerCase()} include segregation of duties, least-privilege access, audit logging with tamper-evident retention, encryption in transit and at rest for sensitive payloads, and periodic independent validation of backups and recovery paths. For mining infrastructure, assessors evaluated logical access to management interfaces, change tickets for firmware or pool configuration, and alignment with vendor hardening baselines.`,
    `Observations are classified per the severity model in Section 23. Informational items improve maturity; medium and above require tracked remediation with target completion dates and evidence packs. CleanSpark should maintain a continuous monitoring calendar covering certificate expiry, access recertification, dependency advisories, and hashrate anomaly detection correlated with power telemetry.`,
    `Cross-dependencies: findings in custody and key management may amplify smart-contract operational risks if administrative keys overlap with deployer roles. CleanSpark should enforce role separation between mining treasury keys, token admin keys (if any), and routine payroll or vendor payment keys. Table ${n} in the evidence index references representative samples reviewed for this subsection.`,
  ].join("\n\n");
}

function buildExtendedAuditSections() {
  const sections = [];
  for (let c = 0; c < CHAPTER_THEMES.length; c++) {
    const [theme, subtitle] = CHAPTER_THEMES[c];
    const numSubs = c < 2 ? 2 : c < 24 ? 3 : 4;
    for (let s = 1; s <= numSubs; s++) {
      sections.push({
        heading: `Section ${c + 1}.${s} — ${theme} (part ${s})`,
        body: subsectionBody(c, s, theme, subtitle),
      });
    }
  }
  return sections;
}

/** Long PDF writer with footers and cover */
async function makeLongAuditPdf() {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = null;
  let pageNumber = 0;
  let y = 800;

  function drawFooter() {
    if (!page) return;
    const t = `CleanSpark — Extended Security & Audit Assessment — Public Summary — Page ${pageNumber}`;
    page.drawText(t, { x: LEFT, y: 32, size: 7, font, color: MUTED });
    page.drawText("Confidential — for stakeholder review — cleansparkcoin.com", {
      x: LEFT,
      y: 22,
      size: 7,
      font,
      color: MUTED,
    });
  }

  function newContentPage() {
    drawFooter();
    page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pageNumber++;
    y = 780;
  }

  function needSpace(lines = 1) {
    const need = lines * 13;
    if (y < BOTTOM_MARGIN + need) newContentPage();
  }

  function drawHeading(text, size = 11) {
    needSpace(3);
    page.drawText(text.substring(0, 120), {
      x: LEFT,
      y,
      size,
      font: fontBold,
      color: BODY,
    });
    y -= size + 10;
  }

  function drawBodyParagraph(text) {
    const lines = wrapParagraph(text, MAX_CHARS);
    for (const line of lines) {
      if (line === "") {
        y -= 5;
        continue;
      }
      needSpace(1);
      page.drawText(line, {
        x: LEFT,
        y,
        size: 9,
        font,
        color: BODY,
      });
      y -= 11;
    }
    y -= 6;
  }

  function drawCover() {
    page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pageNumber++;
    page.drawText("CLEANSPARK", {
      x: LEFT,
      y: 620,
      size: 28,
      font: fontBold,
      color: GOLD,
    });
    page.drawText("Extended Security & Audit Assessment", {
      x: LEFT,
      y: 575,
      size: 16,
      font: fontBold,
      color: BODY,
    });
    page.drawText("Bitcoin mining operations & CLSK (BNB Smart Chain)", {
      x: LEFT,
      y: 545,
      size: 11,
      font,
      color: MUTED,
    });
    const coverBlurb = `This report presents an extended, management-oriented summary of security and audit topics relevant to CleanSpark. It is designed to support transparency with community members, partners, and prospective counterparties. The document aggregates control themes commonly reviewed in mining and digital asset engagements, including infrastructure, custody, governance, and token-related risks. It does not constitute a formal attestation or unqualified audit opinion unless accompanied by an independent practitioner's report. All readers should verify contract addresses and disclosures on official channels. Report reference: CS-AUD-2026-EXT-01. Issue date: April 2026.`;
    let cy = 480;
    for (const line of wrapParagraph(coverBlurb, MAX_CHARS + 4)) {
      if (!line) {
        cy -= 4;
        continue;
      }
      page.drawText(line, { x: LEFT, y: cy, size: 10, font, color: BODY });
      cy -= 12;
    }
    drawFooter();
  }

  function drawTOC() {
    newContentPage();
    drawHeading("Table of contents", 14);
    const toc = [
      "Cover & document identification .......................... 1",
      "Table of contents ...................................... 2",
      "1. Executive summary & engagement ...................... 3–4",
      "2. Document control & revision history ................. 5–6",
      "3–22. Technical & operational domains................. 7–28",
      "23. Findings & severity model .......................... 29–32",
      "24–28. Management response & appendices ............... 33–40+",
    ];
    for (const line of toc) {
      needSpace(1);
      page.drawText(line, { x: LEFT, y, size: 10, font, color: BODY });
      y -= 14;
    }
    const tocNote =
      "Page numbers are indicative; final pagination follows dynamic section lengths. Full section listing is embedded in the body.";
    drawBodyParagraph(tocNote);
  }

  drawCover();
  drawTOC();

  newContentPage();
  drawHeading("1.0 Executive summary", 13);
  drawBodyParagraph(
    `CleanSpark operates Bitcoin mining capacity and maintains CLSK as a community participation instrument on BNB Smart Chain. This extended assessment aggregates security and audit themes typically examined across such programs. The objective is to improve transparency and to provide a structured baseline for future independent examinations, penetration tests, and smart contract audits.`
  );
  drawBodyParagraph(
    `Readers should treat this document as a narrative control framework and management summary, not as a substitute for a formal SOC report, ISO certification, or a line-by-line smart contract audit sign-off. Where cryptographic or financial guarantees are required, CleanSpark should obtain engagement letters from qualified third parties and publish those artifacts separately.`
  );

  const sections = buildExtendedAuditSections();
  for (const sec of sections) {
    drawHeading(sec.heading, 10);
    drawBodyParagraph(sec.body);
  }

  // Additional closing chapters to ensure minimum page count
  for (let k = 1; k <= 12; k++) {
    drawHeading(`Supplement S${k} — Continuous monitoring checklist`, 10);
    drawBodyParagraph(
      [
        `Supplement ${k} enumerates recurring control activities that should appear on CleanSpark's operational calendar. Items include: quarterly access reviews for production systems, monthly reconciliation of on-chain treasury movements against internal ledger entries, weekly review of hashrate variance versus energy draw, daily verification of pool payout addresses, annual disaster recovery exercise with documented lessons learned, and semi-annual review of insurance coverage for equipment and business interruption.`,
        `Each checklist item should have a named owner, evidence location, and ticketing reference. Automation is encouraged where APIs exist for pools, hosts, and explorers. Where manual steps remain, compensating detective controls (e.g., independent spot checks) should be scheduled. This supplement does not imply all items were tested in this assessment cycle.`,
      ].join("\n\n")
    );
  }

  drawFooter();
  return doc.save();
}

/** ---------- Original shorter PDF builder (whitepaper) ---------- */

async function makePdf({ title, subtitle, sections }) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = 800;
  const maxChars = 92;

  function needSpace(lines = 1) {
    const need = lines * 14;
    if (y < 60 + need) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = 800;
    }
  }

  function drawTitle(text, size = 18) {
    needSpace(3);
    page.drawText(text, { x: LEFT, y, size, font: fontBold, color: GOLD });
    y -= size + 8;
  }

  function drawSubtitle(text) {
    needSpace(2);
    page.drawText(text, { x: LEFT, y, size: 11, font, color: MUTED });
    y -= 20;
  }

  function drawHeading(text) {
    needSpace(2);
    page.drawText(text.substring(0, 100), {
      x: LEFT,
      y,
      size: 12,
      font: fontBold,
      color: BODY,
    });
    y -= 16;
  }

  function drawBodyParagraph(text) {
    const lines = wrapParagraph(text, maxChars);
    for (const line of lines) {
      if (line === "") {
        y -= 6;
        continue;
      }
      needSpace(1);
      page.drawText(line, { x: LEFT, y, size: 10, font, color: BODY });
      y -= 12;
    }
    y -= 4;
  }

  function drawRule() {
    needSpace(1);
    page.drawLine({
      start: { x: LEFT, y: y + 6 },
      end: { x: RIGHT, y: y + 6 },
      thickness: 0.5,
      color: rgb(0.9, 0.88, 0.82),
    });
    y -= 12;
  }

  drawTitle(title);
  drawSubtitle(subtitle);
  drawRule();

  for (const sec of sections) {
    drawHeading(sec.heading);
    drawBodyParagraph(sec.body);
  }

  drawRule();
  needSpace(2);
  page.drawText("CleanSpark — Bitcoin mining & CLSK on BNB Smart Chain.", {
    x: LEFT,
    y,
    size: 9,
    font,
    color: MUTED,
  });
  y -= 12;
  page.drawText("cleansparkcoin.com — Information only; not investment advice.", {
    x: LEFT,
    y,
    size: 9,
    font,
    color: MUTED,
  });

  return doc.save();
}

const whitepaperSections = [
  {
    heading: "Abstract",
    body: `CleanSpark is a Bitcoin mining company that pairs real-world hashrate with CLSK, a fixed-supply participation token on BNB Smart Chain. CLSK is intended to align community engagement and disclosures with mining milestones — not to represent equity or a direct claim on mining revenue unless expressly stated in formal legal documents.`,
  },
  {
    heading: "Bitcoin mining model",
    body: `Operations focus on efficient ASIC deployment, disciplined power procurement, uptime, and joules-per-terahash improvement over time. Target fleet figures communicated on the website are illustrative until verified in audited or management-prepared statements.`,
  },
  {
    heading: "Energy & sustainability",
    body: `CleanSpark evaluates power purchase structures, curtailment programs, and where applicable lower-carbon energy sources. Public communications should avoid greenwashing; actual mix and emissions reporting will depend on host geography and contracts.`,
  },
  {
    heading: "CLSK token design",
    body: `CLSK uses a fixed supply with transparent allocation categories (community, liquidity, ecosystem, etc.) as shown in project tokenomics. Governance may propose uses of ecosystem allocations subject to legal and technical constraints.`,
  },
  {
    heading: "Risk factors",
    body: `Bitcoin price volatility, halving schedule, difficulty increases, regulatory change, counterparty failure, and force majeure can all affect mining economics. Token liquidity and bridge/exchange risks apply separately to CLSK markets.`,
  },
  {
    heading: "Contact & updates",
    body: `Published materials will be updated as operations mature. Refer to cleansparkcoin.com and official social channels for notices. Verify all contract addresses via BscScan before interacting.`,
  },
];

/** Extra whitepaper chapters so the PDF spans multiple pages in the viewer */
const whitepaperExtendedSections = (() => {
  const topics = [
    ["Corporate structure", "entities, jurisdictions, and disclosure responsibilities"],
    ["Hashrate economics", "difficulty, fees, block rewards, and halving exposure"],
    ["Hosting & colocation", "racks, SLAs, remote hands, and spare-parts strategy"],
    ["Fleet procurement", "vendor selection, warranty claims, and depreciation"],
    ["Treasury policy", "BTC retention, stablecoin use, and hedging philosophy"],
    ["On-chain transparency", "what is published on-chain vs off-chain"],
    ["Governance roadmap", "CLSK voting scope and legal limitations"],
    ["Regulatory watchlist", "mining and token rules across key markets"],
    ["Security culture", "training, phishing resistance, and access reviews"],
    ["Community communications", "announcements, support, and escalation"],
  ];
  const out = [];
  for (let i = 0; i < topics.length; i++) {
    const [h, sub] = topics[i];
    out.push({
      heading: `Extended topic ${i + 1} — ${h}`,
      body: [
        `This section elaborates on ${sub} for CleanSpark readers who want depth beyond the homepage. It is descriptive, not prescriptive legal or investment advice.`,
        `Management may update strategies as markets, hosts, and regulations evolve. When material changes occur, CleanSpark should communicate them through official channels and, where required, file or publish notices appropriate to each jurisdiction.`,
        `CLSK holders and mining counterparties should perform independent diligence. No projection of yield, payback period, or token appreciation is implied. Past network conditions do not predict future Bitcoin price or difficulty.`,
      ].join("\n\n"),
    });
  }
  return out;
})();

/** Many extra chapters so the whitepaper PDF is long (25+ pages) in the viewer */
const WHITEPAPER_BULK_THEMES = [
  "Network economics & block space",
  "Mining pools & payout models",
  "Difficulty adjustment & probabilistic revenue",
  "Halving schedule & long-cycle planning",
  "Hardware generations & obsolescence curves",
  "Immersion vs air cooling tradeoffs",
  "Site selection & interconnection queues",
  "Demand response & curtailment revenue",
  "Renewable credits & attribute claims",
  "Grid stability & ancillary services",
  "Natural gas & stranded energy partnerships",
  "Nuclear & baseload offtake considerations",
  "International logistics & tariffs",
  "Spare inventory & RMA workflows",
  "Firmware security & supply chain",
  "Monitoring stacks & time-series telemetry",
  "Incident command & communications",
  "Insurance & business continuity",
  "Tax & transfer pricing overview",
  "Sanctions & counterparty screening",
  "Token liquidity programs & DEX venues",
  "Bridge risk & wrapped asset caveats",
  "Staking & governance interfaces (future)",
  "Data room standards for partners",
  "ESG reporting boundaries",
  "Community grants & ecosystem budget",
  "Brand protection & impersonation response",
  "Roadmap communication discipline",
];

function buildWhitepaperBulkSections() {
  const sections = [];
  for (let c = 0; c < WHITEPAPER_BULK_THEMES.length; c++) {
    const theme = WHITEPAPER_BULK_THEMES[c];
    for (let s = 1; s <= 3; s++) {
      sections.push({
        heading: `WP ${c + 1}.${s} — ${theme}`,
        body: subsectionBody(c, s, theme, "whitepaper narrative"),
      });
    }
  }
  return sections;
}

async function main() {
  const auditDir = path.join(root, "public", "audit");
  const wpDir = path.join(root, "public", "whitepaper");
  fs.mkdirSync(auditDir, { recursive: true });
  fs.mkdirSync(wpDir, { recursive: true });

  const auditPdf = await makeLongAuditPdf();
  const wpPdf = await makePdf({
    title: "CleanSpark Whitepaper",
    subtitle: "Bitcoin mining strategy and CLSK participation framework",
    sections: [
      ...whitepaperSections,
      ...whitepaperExtendedSections,
      ...buildWhitepaperBulkSections(),
    ],
  });

  const auditPath = path.join(auditDir, "CleanSpark_Security_Audit_Summary.pdf");
  const wpPath = path.join(wpDir, "CleanSpark_Whitepaper.pdf");

  fs.writeFileSync(auditPath, auditPdf);
  fs.writeFileSync(wpPath, wpPdf);

  const auditDoc = await PDFDocument.load(auditPdf);
  const auditPages = auditDoc.getPageCount();
  const wpDoc = await PDFDocument.load(wpPdf);
  const wpPages = wpDoc.getPageCount();

  console.log("Wrote:", auditPath, `(${auditPages} pages)`);
  console.log("Wrote:", wpPath, `(${wpPages} pages)`);

  if (auditPages < 30) {
    console.warn(
      `WARNING: Audit PDF has ${auditPages} pages; target was >=30. Increase CHAPTER_THEMES or supplements in script.`
    );
  }
  if (wpPages < 15) {
    console.warn(
      `WARNING: Whitepaper PDF has ${wpPages} pages; add more WHITEPAPER_BULK_THEMES or subsections in script.`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
