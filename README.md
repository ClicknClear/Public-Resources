# API-Documentation
This repo contains all of the public documentation and public npm packages for the ClicknClear APIs.

# Using the documentation
For non-API related documentation see the relevant Markdown files:
- [Verification Docs](<./docs/verification/Verification.md>)

For example API requests and documentation see:
- [Postman Collection (Recommended)](<./README.md#postman-collection-recommended>)
- [Swagger Docs](<./README.md#swagger-docs>)


# Using the Packages found in ./packages
This repo contains publicly available npm packages distributed via the Github npm registry.
To use the Github npm registry you will first need to tell your package manager that you want to use github to fetch @clicknclear scoped packages. To do this you will need to create or update your npmrc file with the following values:
```
@clicknclear:registry=https://npm.pkg.github.com/clicknclear
//npm.pkg.github.com/:_authToken={YOUR_GH_AUTH_TOKEN}
```


To get YOUR_GH_AUTH_TOKEN and to read more about the Github package registry see: https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages#authenticating-to-github-packages

All packages will follow Semver but when there are major breaking changes to the APIs/types we will most likely increment the in-code API version keeping backwards compatibility and allowing for gradual migration over.

# Postman Collection (Recommended)
The file [Main.postman_collection.json](<./docs/apis/Main.postman_collection.json>) is an export from the postman collection which is the source of the API documentation.
To load the documentation into postman do the following:
1) Create a new workspace (or use an existing one)
2) Click import, locate the Main.postman_collection.json file, and import it.
3) Setup a postman environment
   - On the left hand side of postman click on the   environments tab
   - Click on the import button and locate the [Main Environment.postman_environment.json](<./docs/apis/Main Environment.postman_environment.json>) file (supplied in this repo)
   - Update the `keyID` and `keySecret` variables with the values generated via your ClicknClear account. Further information on creating this can be found in the Postman collection documentation.

4) Run the login request (this will automatically populate the accessToken and refreshToken variables in your environment)
5) To view the documentation click on the three dots to the right of the "Main" collection and click "View Documentation"

## Swagger Docs
The `swagger-docs.yml` file is an automatic conversion of the "Main.postman_collection.json" file using the command line tool [p2o](https://joolfe.github.io/postman-to-openapi/).
The `Auth` and the `Organisation` paths require you to use the https://music.clicknclear.com/api server
