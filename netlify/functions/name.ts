import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  const name = event.queryStringParameters.name || "World";

  return {
    statusCode: 200,
    body: `<h1>Hello ${name}</h1>`,
    body2: JSON.stringify({ message: `Hello, ${name}!` }),
  };
};

export { handler };
