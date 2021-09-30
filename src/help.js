const chalk = require('chalk');

function args(argv) {
  if (argv[0] === 'version' || argv[0] === '-v') {
    console.log(chalk.blue("Proj-Tools version 1.1.4"));
  }
}

args(process.argv.slice(2));