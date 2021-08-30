# @singlestore/http-clients

`@singlestore/http-clients` is a collection of client wrappers around [SingleStore's HTTP API](https://docs.singlestore.com/managed-service/en/reference/http-api.html).  A variety of programming languages are supported (see below).  Each client exports a few functions which simplify using SingleStore's HTTP API.

| Client Language | Subdirectory |
|-----------------|--------------|
| JavaScript      | /js          |
| PHP             | /php         |

Most clients have been generated from the OpenAPI3 spec using [openapi-generator](https://github.com/OpenAPITools/openapi-generator).  To access SingleStore's full OpenAPI3 spec, you can query the following REST endpoint on the SingleStore HTTP Proxy Server running in your environment:

    GET /api/v1/spec

For language-specific information about each client, please consult the README file in that client's respective subdirectory.

## Documentation

Please see the [SingleStore HTTP API Documentation](https://docs.singlestore.com/managed-service/en/reference/http-api.html).

## Contributing

Pull Requests are welcome.

