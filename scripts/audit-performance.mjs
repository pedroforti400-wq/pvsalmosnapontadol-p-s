// Optional local auditing tool; Lighthouse is installed separately under work/.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const tools = path.resolve('work/performance/tools/node_modules');
const { default: lighthouse } = await import(pathToFileURL(path.join(tools, 'lighthouse/core/index.js')));
const chromeLauncher = await import(pathToFileURL(path.join(tools, 'chrome-launcher/dist/index.js')));
const label = process.argv[2] || 'optimized';
const target = process.argv[3] || 'http://127.0.0.1:4173';
if (!/^[\w-]+$/.test(label)) throw new Error('Use a simple label for report filenames.');
fs.mkdirSync('work/performance', { recursive: true });
for (let run = 1; run <= 3; run++) {
  const chrome = await chromeLauncher.launch({ ...(process.env.CHROME_PATH ? { chromePath: process.env.CHROME_PATH } : {}), chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    const result = await lighthouse(target, {
      port: chrome.port, output: ['json', 'html'], logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile', screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
      throttlingMethod: 'simulate', throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4, requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675 },
    });
    fs.writeFileSync(`work/performance/${label}-${run}.json`, result.report[0]);
    fs.writeFileSync(`work/performance/${label}-${run}.html`, result.report[1]);
    const audits = result.lhr.audits;
    console.log(JSON.stringify({ label, run, score: result.lhr.categories.performance.score * 100, fcp: audits['first-contentful-paint'].numericValue, lcp: audits['largest-contentful-paint'].numericValue, tbt: audits['total-blocking-time'].numericValue, cls: audits['cumulative-layout-shift'].numericValue, bytes: audits['total-byte-weight'].numericValue }));
  } finally { await chrome.kill(); }
}
