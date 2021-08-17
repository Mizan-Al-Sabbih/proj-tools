#!/usr/bin/env node

require = require('esm')(module /*, options */);
require('../src/install/install.js').cli(process.argv);