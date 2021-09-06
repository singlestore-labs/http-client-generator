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

## Cloning

This repository contains submodules (explained below).  Please use the `--recurse-submodules` option when cloning it.  For example:

    git clone https://github.com/singlestore-labs/http-client-generator.git --recurse-submodules

## Layout

This repo is laid out as follows.

| Directory  | Description |
|------------|-------------|
| /          | Contains main generator script. |
| /clients   | Contains a destination directory for each generated client. |
| /config    | Language-specific configuration files for openapi-generator. |
| /examples  | Langugae-specific example files to be copied into the corresponding generated client directory. |
| /templates | A subdirectory of mustache templates for each language.  These override and/or augment the default openapi-generator ones. |

The `/clients` directory has a sub-directory for each generate client, named according to its language.  Each of these subdirectories is represented as a [Git Submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules).  This means that the subdirectory is itself actually a pointer to a separate, standalone Git repository.  These repository mappings are expressed in the [.gitmodules](.gitmodules) file.

This submodule layout makes it convenient for us to re-generate clients and ensure that the designated repository remains synchronized.  For more instructions on the workflow, see below.

## Workflow

To generate a client, run the `generate-client` script with:

* the location of the openapi3.yaml source file
* the target language
* the output directory

Running `generate-client --help` will provide more information.  

Here's an example:

    generate-client -f ./openapi3.yaml php clients/php

The above command will overwrite the existing PHP client in the `clients/php` directory.  Due to it being a submodule, the generated code will actually be written into a local copy of the `singlestore-labs/http-client-php` repository.

To push newly generated changes to a client, you must explicitly add/commit/push the changes in each submodule first, then also add/commit/push in the parent repository.  For example:

    cd clients/php
    git add .
    git commit -m "Regenerated code"
    git push
    cd ../..
    git add .
    git commit -m "Regenerated PHP client"
    git push

This can get tedious, so I've found it helpful to leverage some third-party tools in [git-submodule-tools](https://github.com/kollerma/git-submodule-tools).  So, instead of the above, you could just do:

    git rcommit -am "Regenerated clients"
    git rpush

Think of these client repositories as transient; they are not intended to be updated directly.  Instead, the code generator should be modified in a way that each client can be completely regenerated and then re-pushed to the submodule.

