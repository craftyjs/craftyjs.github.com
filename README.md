# Crafty.js Homepage

This repo contains the content and infrastructure for [craftyjs.com](http://craftyjs.com/).  
Changes should be directed to the `source` subdirectory, the pages will be generated from them.

## How to build locally

Building the website requires that npm and grunt be installed globally.  Then run `npm install` to download the necessary packages.

- `grunt assemble` will build the website, drawing content from the `source` subdirectory
- `grunt connect` will allow you to preview the website locally

## How to view and modify demos

The `demos` subdirectory is realized as a git submodule.  
Any changes to the demo files should be directed to the [craftyjs/demos repository](https://github.com/craftyjs/demos).

After cloning this site repo, the demo files won't be available immediately. To view them, do
```shell
# clone the repo
$ git clone https://github.com/craftyjs/craftyjs.github.com.git
# setup the demo submodule on your PC if it isn't already
$ git submodule init
# fetch the demo submodule files
$ git submodule update
```

To pull the latest changes from the demos repository, do
```shell
# setup submodule and fetch files
# don't worry, it won't do anything if you've done so already
$ git submodule init
$ git submodule update
# change to submodule
$ cd demos/
# you are now in separate git repo belonging to this submodule
# all git commands are directed to this submodule
# update the submodule
$ git checkout master
$ git fetch origin
$ git rebase origin/master
$ cd ..
# you are now main git repo again
# add the HEAD change of the submodule
$ git add demos
# commit now, etc
...
```
