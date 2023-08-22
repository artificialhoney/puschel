#!/usr/bin/env bash

dir=$(pwd)
version="$1"
packages=(cli models core hub ui)
length=${#packages[@]}

for ((i = 0; i < length; i++)); do
  nx build ${packages[$i]} --configuration=production
  cd dist/packages/${packages[$i]}/
  if [ ! -z "$version" ]
  then
    npm version "$version"
  fi
  npm unpublish --force
  npm publish
  cd $dir
done
