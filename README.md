# Serverless Typescript API

This API exposes an interface to an

# How to run the app

- Make sure to have node installed on your machine
- Execute `npm i` in the root project directory
- Execute `npm run start:watch` to start the server with hot reload 🚀

# How to test

- Execute `npm run test`

# How to deploy 

- Configure AWS Environment Variables
- Make sure AWS Role you are assuming using has access to s3, AWS Lambda, and API Gateway
- execute `deploy.sh`