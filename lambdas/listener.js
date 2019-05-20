'use strict';

module.exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // DEBUG

  var eventBody = JSON.parse(event.body);
  console.log("eventBody: ",JSON.stringify(eventBody, null, 2));  // DEBUG:

  // Check if this is the initial subscription event and Log out the SubscribeURL
  // This URL must be visited before subsequent notifications will be sent to this APIG
  if(event.multiValueHeaders.hasOwnProperty('x-amz-sns-message-type') && event.multiValueHeaders['x-amz-sns-message-type'] == "SubscriptionConfirmation") {
    console.log(`eventBody.Message: ${eventBody.Message}`);
    console.log(`SubscribeURL: ${eventBody.SubscribeURL}`);
  } else {
    // The message is stringified before passing to SNS, which is stringified again by APIG
    var message = JSON.parse(eventBody.Message);
    console.log("Message: ",JSON.stringify(message, null, 2));  // DEBUG:

  }

  // Respond to APIG
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Message received!',
      input: event,
    }, null, 2),
  };

};
