console.log('loaded');

// https://michaelheap.com/netlify-function-lambda-return-image/
/* eslint-disable no-undef */
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const axios = require("axios");

const search = async (isbn) => {
  const url = "https://api.openbd.jp/v1/get?isbn=" + isbn.toString();
  const res = await axios.get(url);
  const book = genBook(res.data);
  return book;
};

const genBook = (json) => {
  const book = {};
  const onix = json[0] && json[0];
  const summary = json[0] && json[0].summary;
  book.title = summary.title;
  book.publisher = summary.publisher;
  book.authors = summary.author.split(" ");
  book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  book.cover = summary.cover;
  book.notes = json[0].onix?.CollateralDetail?.TextContent.map(
    (e) => e.Text
  ).join("\n\n");
  return book;
};

exports.handler = async function (event, context) {
// https://github.com/netlify/zip-it-and-ship-it/issues/525#issuecomment-858580934
// https://github.com/spencewood/svg-function/pull/2/files
console.log('default fontconfig path: ', process.env.FONTCONFIG_PATH);
require('fs').readFile('/tmp/aws/fonts.config', function(err,buf){ process.stdout.write(buf); });
// process.env.FONTCONFIG_PATH = "/var/task/functions/bookimage";
// process.env.FONTCONFIG_PATH = "/var/task/netlify/functions/image";
// process.env.FONTCONFIG_PATH = "/app/netlify/functions/image";
console.log('updated fontconfig path: ', process.env.FONTCONFIG_PATH);


console.log('invoked');

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { height: 630, width: 400 },
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const isbn = event.queryStringParameters.isbn || "9784478109373";
  console.log('Searching isbn: ' + isbn);
  const book = await search(isbn);
  console.log('found title: ' + book.title);

  await page.setContent(`<body>The book is <strong>${book.title}</strong>
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
