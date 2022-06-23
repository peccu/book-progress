import fetch from "node-fetch";

// const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts'
const API_ENDPOINT = "https://api.github.com/users/github";

export const handler = async () => {
  let response: any;
  try {
    // const response = await fetch();
    // const data = await response.json();

    response = await fetch(API_ENDPOINT);
    console.log(JSON.stringify(response.json()));
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response.json(),
    }),
  };
};
