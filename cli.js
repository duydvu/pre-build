#!/usr/bin/env node
const { getConfig } = require('./src/config');
const preBuild = require('./src/pre-build');

getConfig();
preBuild();
