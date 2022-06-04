import fetch from 'node-fetch'

const API_ENDPOINT = 'https://cat-fact.herokuapp.com/facts'

export const handler = async (event, context) => {
  let response
  try {
    response = await fetch(API_ENDPOINT)
    console.log(JSON.stringify(response))
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}