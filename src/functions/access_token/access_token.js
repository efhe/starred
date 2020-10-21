const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod === 'POST') {
      const { code } = JSON.parse(event.body);
      if (code) {
        const response = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            code,
            client_id: process.env.REACT_APP_STARRED_CLIENT_ID,
            client_secret: process.env.REACT_APP_STARRED_CLIENT_SECRET,
          }),
        });
        if (!response.ok) {
          return {
            statusCode: response.status,
            body: response.statusText,
          }
        }
        const data = await response.json()

        return {
          statusCode: 200,
          body: JSON.stringify(data),
        }
      }
    }
    return {
      statusCode: 500,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}
