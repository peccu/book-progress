// generate sharing page for capture

/* eslint-disable no-undef */
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

const html = (content) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no"
    />
    <script type="text/javascript" src="//typesquare.com/3/tsst/script/ja/typesquare.js?6090fc46075c4de7aa491d84ac1e02e5" charset="utf-8"></script>
  </head>
  <body>${content}</body>
</html>`;

const noBookContent = () =>
  html(`
<h1>The book info does not found.</h1>
<div>
  <svg height="210" width="500">
  <polygon points="200,10 250,190 160,210" style="fill:lime;stroke:purple;stroke-width:1" />
  Sorry, your browser does not support inline SVG.
</svg>
</div>
`);

const bookContent = (book) => {
  // const img = book.cover !== "" ? `<img src="${book.cover}"/>` : "";
  const img = book.cover !== "" ? `<image x="200" y="60" href="${book.cover}"/>` : "";
  return html(`
<svg height="600" width="400">
  <rect x="0" y="0" width="400" height="400" fill="darkgreen"/>
  <polygon points="100,110 150,190 60,200" style="fill:lime;stroke:purple;stroke-width:1" />
  <text x="10" y="10"
        font-size="40" text-anchor="left" fill="white" dominant-baseline="hanging"
        font-family="serif"
        >${book.title}</text>
  ${img}
</svg>
`);
};

exports.handler = async function (event) {
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
  return {
    statusCode: 200,
    body: content,
  };
};
