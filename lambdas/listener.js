'use strict';

module.exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // DEBUG
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };

};
