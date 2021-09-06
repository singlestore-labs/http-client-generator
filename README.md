# SingleStore HTTP Client Generator

This repository is a generator for language-specific client wrappers around [SingleStore's HTTP API](https://docs.singlestore.com/managed-service/en/reference/http-api.html).  Currently supported programming languages are listed below.

| Client Language | Directory                   |
|-----------------|-----------------------------|
| JavaScript      | [clients/js](clients/js)    |
| PHP             | [clients/php](clients/php)  |

All clients have been generated from SingleStore's OpenAPI 3.0 spec using [openapi-generator](https://github.com/OpenAPITools/openapi-generator).  

The [spec](openapi3.yaml) is available in this repo.

In an upcoming release, the spec will be downloadable by querying the following REST endpoint on a SingleStore HTTP Proxy Server:

    GET /api/v1/spec

## Maintenance

https://github.com/kollerma/git-submodule-tools

TODO


## Building


TODO

For convenience, this repo provides pregenerated clients for all supported languages, each found in its own respective directory.  If you wish, you can re-generate them by using the [`generate-client.sh`](generate-client.sh) script.  For more information, run `generate-client.sh --help`.

