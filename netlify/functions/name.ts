import { Handler } from "@netlify/functions";

const fetch = require("node-fetch");

const API_ENDPOINT = "https://icanhazdadjoke.com/";

// exports.handler = async (event, context) => {
const f = () => {
  return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: data.joke,
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

const html = (data) => `
<html>
<head>
<title>book title - Book Progress</title>
<meta property="og:title" content=たいとるやで>
<meta property="og:site_name" content=さいとめいやけ>
<meta property="og:url" content=https://google.com/?q=og>
<meta property="og:description" content=descriptiondssssddd>
<meta property="og:type" content=object>
<meta property="og:image" content=imageurl>
<script>// jump to original app page or, decode and display content
</script>
<body>
Shared content ${data.title}
</body>
</html>
`

const search = async (isbn: number) => {
  const book = {};
  // alert(`foo ${isbn}`);
  const response = await fetch(
    "https://api.openbd.jp/v1/get?isbn=" + isbn.toString()
  )
  .then((response) => response.json());
  const json = response;
  const onix = json[0] && json[0];
  // result.value = JSON.stringify(onix, null, 2);
  const summary = json[0] && json[0].summary;
  //  picked.value = summary;
  book.title = summary.title;
  book.publisher = summary.publisher;
  book.authors = summary.author.split(" ");
  book.pages = json[0].onix?.DescriptiveDetail?.Extent[0].ExtentValue;
  book.cover = summary.cover;
  book.notes = json[0].onix?.CollateralDetail?.TextContent.map(
    (e: { Text?: string; TextType?: string; ContentAudience?: string }) =>
      e.Text
  ).join("\n\n");
  return book;
};


const handler: Handler = async (event, context) => {
  const isbn = event.queryStringParameters.isbn || "9784478109373";
return f();/*
  const data = await search(isbn);
  return {
    statusCode: 200,
    body: html(data),
    body2: JSON.stringify({ message: `Hello, ${name}!` }),
  };*/
};

export { handler };
