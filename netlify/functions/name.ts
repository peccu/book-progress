import { Handler } from "@netlify/functions";

const fetch = require("node-fetch");

const API_ENDPOINT = "https://icanhazdadjoke.com/";

exports.handler = async (event, context) => {
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
Shared content ${data.name}
</body>
</html>
`


const handler: Handler = async (event, context) => {
  const name = event.queryStringParameters.name || "World";
  const data = {name};
  return {
    statusCode: 200,
    body: html(data),
    body2: JSON.stringify({ message: `Hello, ${name}!` }),
  };
};

export { handler };
