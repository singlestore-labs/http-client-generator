#!/usr/bin/env bash

usage() {
    cat <<EOF
Usage: $0 <HOST[:PORT]> <DIR>

Requires two arguments:

    HOST[:PORT]  Host and optional port for the SingleStore HTTP Proxy.
    DIR          Directory where generated code will be written.  Will be
                 created if it doesn't exist.

EOF
    exit 1
}

check-err() {
    local CODE=$?
    if [ $CODE -ne 0 ] ; then
        echo "ERROR: $1"
        exit $CODE
    fi
}

# Check args.
[ $# -ne 2 ] && usage
PROXYHOST=$1
OUTDIR=$2

# Find programs we need.
DOCKER=$(which docker)
check-err "Could not find docker in PATH.  Exiting."
CURL=$(which curl)
check-err "Could not find curl in PATH.  Exiting."

# Create the output directory.
mkdir -p ${OUTDIR}
check-err "Error creating directory ${OUTDIR}.  Exiting."
OUTDIR=$(cd ${OUTDIR} && pwd)
SPECFILE=${OUTDIR}/openapi3.yaml

# Fetch the openapi3 spec from the proxy.
echo "Fetching spec file ..."
${CURL} -s -o ${SPECFILE} ${PROXYHOST}/api/v1/spec
check-err "Error downloading spec file.  Exiting."

# Generate the client.
echo "Generating client API..."
IMAGE=openapitools/openapi-generator-cli
${DOCKER} run --rm -v "${OUTDIR}:/out" ${IMAGE}    \
    generate                                       \
        -i /out/openapi3.yaml                      \
        -g php                                     \
        -o /out                                    \
        --api-package=SingleStore                  \
        --model-package=SingleStore                \
        --package-name=SingleStoreClient           \
    > /dev/null
check-err "Error generating client.  Exiting."

echo "Done."

