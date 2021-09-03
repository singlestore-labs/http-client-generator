#!/usr/bin/env bash

usage() {
    cat <<EOF
Usage: $0 {-h HOST[:PORT] | -f PATH} LANG DIR

Generates an HTTP client for the specified language.

Arguments:
    -f PATH         Selects a file system path for the location of the source
                    spec file.  Mutually exclusive with -h.

    -h HOST[:PORT]  Selects the host and optional port of a SingleStore HTTP 
                    Proxy, from which the source spec will be downloaded.
                    Mutually exclusive with -f.

    LANG            Selects the client language to generate (see below).

    DIR             Specifies the directory where generated code will be 
                    written.  Will be created if it doesn't exist.

Supported languages:
    js              JavaScript client
    php             PHP client

Examples:
    Generate a PHP client from the S2 Proxy on localhost, port 8080:
        `basename $0` localhost:8080 php /var/www/html/s2-php

    Generate a JavaScript client from a file.
        `basename $0` /tmp/openapi3.yaml javascript /var/www/html/s2-js

EOF
    exit 1
}

find-cmd() {
    local INCMD="$1"
    local INTYPE=$(type -t "${INCMD}")
    check-err "Could not find command ${INCMD} in shell or PATH.  Exiting."
    local OUTCMD="${INCMD}"
    [ "${INTYPE}" = "file" ] && OUTCMD=$(type -P "${INCMD}")
    echo "${OUTCMD}"
}

check-err() {
    local CODE=$?
    if [ ${CODE} -ne 0 ] ; then
        echo "ERROR: $1"
        exit ${CODE}
    fi
}

impossible() {
    echo "This shouldn't happen!"
    exit 1
}

# Check args.
[ $# -ne 4 ] && usage
SRCTYPE=$1
SOURCE=$2
LANGUAGE=$3
OUTDIR=$4

case "${SRCTYPE}" in
    -f) SRCTYPE=file ;;
    -h) SRCTYPE=host ;;
    *)  usage        ;;
esac

# Find programs we need.
_DIRNAME=$(find-cmd dirname)
_MKDIR=$(find-cmd mkdir)
_PWD=$(find-cmd pwd)
_CP=$(find-cmd cp)
_ID=$(find-cmd id)
_GREP=$(find-cmd grep)
_DOCKER=$(find-cmd docker)
_CURL=$(find-cmd curl)

# Get this script's dir.
MYDIR=$(cd $("${_DIRNAME}" "$0") && ${_PWD})

# Make sure the language is supported.
SUPPORTED="js php"
echo "${SUPPORTED}" | "${_GREP}" -wq "${LANGUAGE}" > /dev/null 2>&1
check-err "Unsupported language: ${LANGUAGE}"

# Create the output directory.
"${_MKDIR}" -p "${OUTDIR}"
check-err "Error creating directory ${OUTDIR}.  Exiting."
OUTDIR=$(cd "${OUTDIR}" && "${_PWD}")
SPECFILE="${OUTDIR}/openapi3.yaml"

# If host type, fetch the openapi3 spec from the proxy, otherwise
# get it from the filesystem..
case "${SRCTYPE}" in
    host)
        echo "Fetching spec file from proxy: ${SOURCE}..."
        "${_CURL}" -s -o "${SPECFILE}" "${SOURCE}/api/v1/spec"
        check-err "Error downloading spec file.  Exiting."
        ;;
    file)
        echo "Copying spec file from path: ${SOURCE} ..."
        "${_CP}" "${SOURCE}" "${SPECFILE}"
        ;;
    *)
        impossible
        ;;
esac

# Scrape out the version information from the spec.  Version specification
# seems to be inconsistent between generators.
SPECVER=$(${_GREP} -oP '  version: "\K[^"]*' < "${SPECFILE}")
check-err "Could not find version field in spec file.  Exiting..."

# Map the input language to the generator language.
GENLANG=
GENPRMS=
case "${LANGUAGE}" in
    php)
        GENLANG=php

        GENPRMS+=" -p projectName=singlestore/http-client"
        GENPRMS+=" -p licenseName=Apache"
        GENPRMS+=" -p moduleName=SingleStoreClient"
        GENPRMS+=" -p legacyDiscriminatorBehavior=false"
        GENPRMS+=" -p composerPackageName=singlestore/http-client"
        GENPRMS+=" -p artifactVersion=${SPECVER}"
        ;;
    js)
        GENLANG=javascript

        GENPRMS="  -p projectName=@singlestore/http-client"
        GENPRMS+=" -p licenseName=Apache"
        GENPRMS+=" -p moduleName=SingleStoreClient"
        GENPRMS+=" -p usePromises=true"
        ;;
    *)   impossible        ;;
esac

# Get user and group IDs.
USRID=$(${_ID} -u)
check-err "Error getting user ID.  Exiting."
GRPID=$(${_ID} -g)
check-err "Error getting group ID.  Exiting."

# Generate the client.
echo "Generating client API ..."
IMAGE=openapitools/openapi-generator-cli
${_DOCKER} run                                     \
    --rm -v "${OUTDIR}:/out"                       \
    --user ${USRID}:${GRPID}                       \
    ${IMAGE}                                       \
    generate                                       \
        -i /out/openapi3.yaml                      \
        -g "${GENLANG}"                            \
        -o /out                                    \
        --api-package=Client                       \
        --model-package=Client                     \
        --package-name=SingleStore                 \
        --invoker-package=SingleStore              \
        ${GENPRMS}                                 \
    > /dev/null
check-err "Error generating client.  Exiting."

# Copy the example over to the output directory.
EXAMPLE="${MYDIR}/examples/example.${LANGUAGE}"
echo "Adding example file: ${EXAMPLE} ..."
"${_CP}" "${EXAMPLE}" "${OUTDIR}"

echo "Done."

