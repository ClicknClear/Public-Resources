# API-Documentation
This repo is to store all of the public documentation on interacting with the ClicknClear APIs.

# Using the documentation
In this repo there are currently two files which provide the main docs for the ClicknClear APIs

## Postman Collection (Recommended)
The file `Main.postman_collection.json` is an export from the postman collection which is the source of the documentation.
To load the documentation into postman do the following:
1) Create a new workspace (or use an existing one)
2) Click import, locate the Main.postman_collection.json file, and import it.
3) Setup a postman environment
 - - On the left hand side of postman click on the   environments tab
    - Click on the import button and locate the "Main Environment.postman_environment.json" file (supplied in this repo)
    -  Update your `apiKey` variable with a key generated via your ClicknClear account. Further information on creating this can be found in the Postman collection documentation.
4) Run the login request (this will automatically populate the accessToken and refreshToken variables in your environment)
5) To view the documentation click on the three dots to the right of the "Main" collection and click "View Documentation"

## Swagger Docs
The `swagger-docs.yml` file is an automatic conversion of the "Main.postman_collection.json" file using the command line tool [p2o](https://joolfe.github.io/postman-to-openapi/).
The `Auth` and the `Organisation` paths require you to use the https://music.clicknclear.com/api server
The `Revenue Streams` paths require you to use the https://verification.clicknclear.com/api server
