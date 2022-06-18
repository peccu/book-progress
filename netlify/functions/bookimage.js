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
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { height: 630, width: 1200 },
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
