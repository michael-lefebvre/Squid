#!/bin/bash

os=${OSTYPE//[0-9.]/}

# Get the full path of this script
if [[ ${0} == /* ]]; then
  full_path="$0"
else
  full_path="${PWD}/${0#./}"
fi

# Remove /src/scripts/release.sh to get the root directory
root_dir=${full_path%/*}

gulp build

release_dir="$root_dir/release"
build_dir="$root_dir/build"
deps_dir="$root_dir/tmp"

mkdir -p $release_dir

rm -rf $release_dir/*

pushd $build_dir
 zip -r $release_dir/app.nw *
popd

cd $release_dir

cp -R "$deps_dir/nwjs.app" .
mv nwjs.app Squid.app
rm Squid.app/Contents/Info.plist
rm Squid.app/Contents/Resources/nw.icns
cp "$root_dir/Info.plist" Squid.app/Contents
cp app.nw Squid.app/Contents/Resources/app.nw
cp "$root_dir/squid.icns" Squid.app/Contents/Resources
