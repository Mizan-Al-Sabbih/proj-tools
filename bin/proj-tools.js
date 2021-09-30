#!/usr/bin/env node

require = require('esm')(module /*, options */);
require('../src/help.js').cli(process.argv);