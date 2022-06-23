// capture sharing page

/* eslint-disable no-undef */

// https://michaelheap.com/netlify-function-lambda-return-image/
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

exports.handler = async function (event) {
  // https://github.com/alixaxel/chrome-aws-lambda
  // v over 50MB problem
  // await chromium.font('/var/task/netlify/functions/image/NotoSerifCJKjp-Regular.otf');
  // 302 moved
  // await chromium.font('https://github.com/ixkaito/NotoSerifJP-subset/raw/master/subset/NotoSerifCJKjp-Regular.otf');
  await chromium.font(
    "https://raw.githubusercontent.com/ixkaito/NotoSerifJP-subset/master/subset/NotoSerifCJKjp-Regular.otf"
  );
  const scale = 2;
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      height: 630 / scale,
      width: 1200 / scale,
      deviceScaleFactor: scale,
    },
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const isbn = event.queryStringParameters.isbn || "9784478109373";
  // await page.setContent(content);
  const url =
    process.env.NETLIFY_LOCAL == "true"
      ? "http://localhost:9999"
      : process.env.URL;
  await page.goto(`${url}/.netlify/functions/html?isbn=${isbn}`);

  await page.waitForTimeout(1000);
  // or
  // await page.waitForSelector('img');

  const buffer = await page.screenshot();
  await browser.close();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
};
