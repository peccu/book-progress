/* eslint-disable no-undef */

const html = (data) => {
  // const url = process.env.NETLIFY_LOCAL == "true" ? "http://localhost:9999" : process.env.URL;
  // const imageurl = `${url}/.netlify/functions/image?debug=1&isbn=${data.isbn}`;
  // const imageurl = `https://res.cloudinary.com/peccu/image/upload/v1655962966/9784101010038.png`;
  const imageurl = `https://res.cloudinary.com/peccu/image/upload/book-progress/${data.isbn}.png`;
  return `
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
<meta property="og:image" content="${imageurl}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@peccul">
<meta name="twitter:title" content="タイトルの進捗 - Book Progress">
<meta name="twitter:description" content="タイトル 著書の進捗 : 現在23%">
<meta name="twitter:image" content="${imageurl}">

<script>// jump to original app page or, decode and display content
</script>
<body>
Shared content ${data.title}
</body>
</html>
`;
};

exports.handler = async (event) => {
  const isbn = event.queryStringParameters.isbn || "9784478109373";
  const data = {
    title: "book title",
    isbn,
  };
  return {
    statusCode: 200,
    body: html(data),
  };
};
