#!/usr/bin/env node

require = require('esm')(module /*, options */);
require('../src/index.js').cli(process.argv);