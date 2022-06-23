/* eslint-disable no-undef */

// https://michaelheap.com/netlify-function-lambda-return-image/
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
  if (json.length == 0 || json[0] === null || !json[0].summary) {
    return null;
  }
  const onix = json[0] && json[0];
  const summary = json[0] && json[0].summary;
  book.title = summary.title;
  book.publisher = summary.publisher;
  book.authors = summary.author.split(" ");
  book.cover = summary.cover;

  if (
    json[0].onix &&
    json[0].onix.DescriptiveDetail &&
    json[0].onix.DescriptiveDetail.Extent &&
    json[0].onix?.DescriptiveDetail?.Extent &&
    json[0].onix?.DescriptiveDetail?.Extent[0] &&
    json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue
  )
    book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  return book;
};

const noBookContent = () => `<body>
<h1>The book info does not found.</h1>
<div>
  <svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>
</div>
</body>`;

const bookContent = (book) => {
  const img = book.cover !== "" ? `<img src="${book.cover}"/>` : "";
  return `<body>
<h1>The book is <strong>${book.title}</strong></h1>
<div>
  <svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>
</div>
${img}
</body>`;
};

const upload = async () => {
  const cloudinary = require("cloudinary");
  console.log({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
  });

  // Setup Cloudinary uploader
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
  });

  cloudinary.v2.uploader.upload(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function(error, result) {
      console.log('result');
      console.log(result);
      console.log('error');
      console.log(result);
    });

  // const newImage = await cloudinary.v2.uploader.upload(
  //   './temp.jpg');// ,
  // //   function (error, result) {
  // //     insertLine(`../_posts/${filename.file}`)
  // //       .content(`ogimage: ${result.secure_url}`) // Create YML variable
  // //       .at(9) // At line 9 in my case
  // //       .then(function (err) {
  // //         log(`${chalk.green(`✔️ Inserted ogimage front matter`)}`)
  // //       })
  // //   }
  // // )
  // return newImage;
};

exports.handler = async function (event, context) {
  // https://github.com/alixaxel/chrome-aws-lambda
  // v over 50MB problem
  // await chromium.font('/var/task/netlify/functions/image/NotoSerifCJKjp-Regular.otf');
  // 302 moved
  // await chromium.font('https://github.com/ixkaito/NotoSerifJP-subset/raw/master/subset/NotoSerifCJKjp-Regular.otf');
  await chromium.font(
    "https://raw.githubusercontent.com/ixkaito/NotoSerifJP-subset/master/subset/NotoSerifCJKjp-Regular.otf"
  );
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      height: 630 * 2,
      width: 1200 * 2,
      deviceScaleFactor: 1,
    },
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const isbn = event.queryStringParameters.isbn || "9784478109373";
  console.log("Searching isbn: " + isbn);
  const book = await search(isbn);
  let content;
  if (book == null) {
    console.log("not found for ISBN: " + isbn);
    content = noBookContent();
  } else {
    console.log("found title: " + book.title);
    content = bookContent(book);
  }
  await page.setContent(content);
  await page.waitForTimeout(1000);
  // or
  // await page.waitForSelector('img');

  const buffer = await page.screenshot();
  await browser.close();

  const cloudImage = await upload();
  // console.log('cloud image: ' + cloudImage.secure_url);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
    },
    body: buffer.toString("base64"),
    isBase64Encoded: true,
  };
};
