// https://michaelheap.com/netlify-function-lambda-return-image/
/* eslint-disable no-undef */
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { height: 630, width: 1200 },
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.setContent(`<body>This is a <strong>Demo</strong>
  <svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg></body>`);
  await page.waitForTimeout(1000);
  const buffer = await page.screenshot();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
};
