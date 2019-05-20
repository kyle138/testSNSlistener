# testSNSlistener
Example APIG/Lambda to test https subscription to SNS topic in another AWS account

## Prerequisites
* You will need the Account ID of the receiving AWS account
* This Account ID will need to be added to the Access Policy of the SNS topic in the source AWS account.
  ```javascript
  {
      "Effect": "Allow",
      "Principal": {
        "AWS": "0000000000" # Replace 0...0 with Destination AWS AccountId
      },
      "Action": [
        "SNS:Subscribe",
        "SNS:Receive"
      ],
      "Resource": "arn:aws:sns:us-east-1:1111111111:testSNStopic" # Replace 1...1 with Source AWS AccountId
  }
  ```
* Clone this repo and deploy it into the destination AWS account
  ```serverless deploy```
  * Make note of the APIG endpoint for snsWebhook
* In the destination AWS account console, open the Simple Notification Service (SNS) service and select **Subscriptions**
* Click on **[Create subscription]**
* In the **Topic ARN** field enter the ARN of the source SNS topic
* In the **Protocol** pull down menu, select **HTTPS**
* In the **Endpoint** field enter the APIG endpoint you noted earlier
* Click on **[Create subscription]**
* A **SubscribeURL** was just sent to the APIG endpoint in the receving AWS account
  * Check the CloudWatch logs for the SLS-testSNSlistener-dev1-listener Lambda function
  * Locate the SubscribeURL and copy/paste that into your browser
  * You should now be subscribed to receive future notifications from this SNS topic.
