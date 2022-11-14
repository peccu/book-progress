// -*- js2 -*-
// https://github.com/Chuloo/gatsby-netlify-functions/blob/master/src/lambda/fetch.js
import axios from "axios";

const search = async (isbn) => {
  const url = `https://api.openbd.jp/v1/get?isbn=${isbn.toString()}`;
  const res = await axios.get(url);
  const book = genBook(res.data);
  return book;
};

const genBook = (json) => {
  const book = {};
  const onix = json[0]?.onix;
  const summary = json[0]?.summary;
  book.title = summary.title;
  book.publisher = summary.publisher;
  book.authors = summary.author.split(" ");
  book.pages = onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  book.cover = summary.cover;
  book.notes = onix?.CollateralDetail?.TextContent.map((e) => e.Text).join(
    "\n\n",
  );
  return book;
};

export const handler = async function (event, context, callback) {
  const isbn = event.queryStringParameters.isbn || "9784478109373";
  console.log(`Searching isbn: ${isbn}`);
  const book = await search(isbn);
  console.log(`found title: ${book.title}`);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(book),
  });
};
