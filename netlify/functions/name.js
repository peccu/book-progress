/* eslint-disable no-undef */

// import { Handler } from "@netlify/functions";

//const fetch = require("node-fetch");
// import fetch from "node-fetch";
// const API_ENDPOINT = "https://icanhazdadjoke.com/";

// exports.handler = async (event, context) => {
// const f = (isbn) => {
//   return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
//     .then((response) => response.json())
//     .then((data) => ({
//       statusCode: 200,
//       body: data.joke,
//     }))
//     .catch((error) => ({ statusCode: 422, body: String(error) }));
// };

const html = (data) => `
<html>
<head>
<title>book title - Book Progress</title>
<meta property="og:title" content=たいとるやで>
<meta property="og:site_name" content=さいとめいやけ>
<meta property="og:url" content=https://google.com/?q=og>
<meta property="og:description" content=descriptiondssssddd>
<meta property="og:type" content=object>
<meta property="og:image:height" content="630">
<meta property="og:image:width" content="1200">
<meta property="og:image" content="https://book-progress.netlify.app/.netlify/functions/image?debug&isbn=${data.isbn}">


<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@nytimes">
<meta name="twitter:creator" content="@SarahMaslinNir">
<meta name="twitter:title" content="Parade of Fans for Houston’s Funeral">
<meta name="twitter:description" content="NEWARK - The guest list and parade of limousines with celebrities emerging from them seemed more suited to a red carpet event in Hollywood or New York than than a gritty stretch of Sussex Avenue near the former site of the James M. Baxter Terrace public housing project here.">
<meta name="twitter:image" content="https://book-progress.netlify.app/.netlify/functions/image?debug&isbn=${data.isbn}">
<!--
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@peccul">
<meta name="twitter:title" content="タイトルの進捗 - Book Progress">
<meta name="twitter:description" content="タイトル 著書の進捗 : 現在23%">
<meta name="twitter:image" content="https://book-progress.netlify.app/.netlify/functions/image?debug&isbn=${data.isbn}">
-->
<script>// jump to original app page or, decode and display content
</script>
<body>
Shared content ${data.title}
</body>
</html>
`;

// const search = async (isbn) => {
//   const book = {};
//   // alert(`foo ${isbn}`);
//   const response = await fetch(
//     "https://api.openbd.jp/v1/get?isbn=" + isbn.toString()
//   ).then((response) => response.json());
//   const json = response;
//   const onix = json[0] && json[0];
//   // result.value = JSON.stringify(onix, null, 2);
//   const summary = json[0] && json[0].summary;
//   //  picked.value = summary;
//   book.title = summary.title;
//   book.publisher = summary.publisher;
//   book.authors = summary.author.split(" ");
//   book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
//   book.cover = summary.cover;
//   book.notes = json[0].onix?.CollateralDetail?.TextContent.map(
//     (e) => e.Text
//   ).join("\n\n");
//   return book;
// };

// export const handler = async (event, context) => {
exports.handler = async (event, context) => {
  const isbn = event.queryStringParameters.isbn || "9784478109373";
  //return f(isbn); /*
  // const data = await search(isbn);
  const data = { title: "book title", isbn };
  return {
    statusCode: 200,
    body: html(data),
  }; // */
};

// export { handler };
