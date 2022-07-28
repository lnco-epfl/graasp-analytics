#!/bin/bash

# fail the build on any failed command
set -e

usage() {
  echo "usage: $0 [-e <path/to/file>] [-b <path/to/build>]" 1>&2
  exit 1
}

# default build directory
BUILD="build/"

# validates that build directory exists
validate_build() {
  if [ -d $1 ]; then
    echo "info: validated build directory $1"
    BUILD=$1
  else
    echo "error: build directory '$1' does not exist" 1>&2
    exit 1
  fi
}

# validates that environment file exists
validate_env() {
  if [ -f $1 ]; then
    echo "info: validated environment file $1"
    source ${1}
  else
    echo "error: environment file '$1' does not exist" 1>&2
    exit 1
  fi
}

# parse command line arguments
while getopts "e:b:" opt; do
  case ${opt} in
    e)
      e=${OPTARG}
      validate_env ${e}
      ;;
    b)
      b=${OPTARG}
      validate_build ${b}
      ;;
    \?)
      echo "error: invalid option '-$OPTARG'" 1>&2
      exit 1
      ;;
  esac
done

# ensure the correct aws credentials are defined
if \
  [ -z "${BUCKET}" ] || \
  [ -z "${DISTRIBUTION}" ] || \
  [ -z "${AWS_ACCESS_KEY_ID}" ] || \
  [ -z "${AWS_SECRET_ACCESS_KEY}" ]; then
  echo "error: environment variables BUCKET, DISTRIBUTION, AWS_ACCESS_KEY_ID and/or AWS_SECRET_ACCESS_KEY are not defined" 1>&2
  echo "error: make sure you setup your credentials file correctly using the scripts/setup.sh script" 1>&2
  echo "error: and contact your favourite Graasp engineer if you keep running into trouble" 1>&2
  exit 1
fi

export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

echo "info: releasing graasp analytics"

# sync s3 bucket
aws s3 sync ${BUILD} s3://${BUCKET} --delete

# invalidate cloudfront distribution
aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION} --paths '/*'
