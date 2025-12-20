Why these env variables?

SECRETS:
MONGODB_URI - secret, because eventually we'll have the user id and password here
Shopify_API_KEY - secret, for API

VALUES THAT MIGHT CHANGE WHEN WE ARE WORKING LOCALLY VS DEPLOYED:
PORT - port number
NODE_ENV - environments (we haven't talked about this yet)