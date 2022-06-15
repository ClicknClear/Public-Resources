# API-Documentation
This repo is to store all of the public documentation on interacting with the ClicknClear APIs.

# Using the documentation
In this repo there are currently two files which provide the main docs for the ClicknClear APIs

## Postman Collection (Recommended)
The file `Main.postman_collection.json` is an export from the postman collection which is the source of the documentation.
To load the documentation into postman do the following:
1) Create a new workspace (or use an existing one)
2) Click import and then find your file and import it
3) Setup a postman environment with the following values
```
apiKey: {your api key}
lvsAPI: https://verification.clicknclear.com/api
lpAPI: https://music.clicknclear.com/api
```
4) Run the login request (this will automatically populate teh accessToken and refreshToken variables)


## Swagger Docs
The `swagger-docs.yml` file is an automatic conversion of the "Main.postman_collection.json" file using the command line tool [p2o](https://joolfe.github.io/postman-to-openapi/).
The `Auth` and the `Organisation` paths require you to use the https://music.clicknclear.com/api server
The "Revenue Streams" paths require you to use the https://verification.clicknclear.com/api server
