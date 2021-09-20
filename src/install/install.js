const { spawn } = require('child_process');
const inquirer = require('inquirer');
const arg = require('arg');
const { promisify } = require('util');

const argumentz = promisify(arg);

function argument(argv) {
  const args = argumentz(
    {
      "--save-dev": Boolean,
      "--save-prod": Boolean,
      "--global": Boolean,
      "--no-bin-links": Boolean,
      "-D": "--save-dev",
      "-P": "--save-prod",
      "-g": "--global",
    },
    {
       argv: process.argv.slice(2),
    }
  );
  return {
    saveInDevdependencies: args['--save-dev', '--save-prod'] || false,
    installGlobally: args['--global'] || false,
    installAnyPackage: argv[0],
    notCreateAnyBinDirectory: args['--no-bin-links'] || false,
  };
}

async function workingFunction(arguments) {
  if (arguments.installAnyPackage) {
    return {
      ... arguments,
      installPackage: arguments.installAnyPackage,
    }
  }

  const questions = [];
  
  if (!arguments.installAnyPackage) {
   await questions.push({
     type: 'text',
     name: 'package',
     message: 'What package do you want to install?',
   });
}

  await questions.push({
    type: 'list',
    name: 'packageManager',
    message: 'Which package manager do you want to use?',
    choices: [
      'NPM',
      'Yarn'
    ]
  });
  
  const answers = await inquirer.prompt(questions);

  switch (answers.packageManager) {
      case'NPM':
       npmInstall();
      break;
    case'Yarn':
       yarnInstall();
      break;
    default:
      break;
  }
}

 function npmInstall() {
  const npm = spawn('npm', ['install', `${arguments.installAnyPackage || answers.package} ${arguments}`]);
  npm.stderr.on('data', (data) => {
   console.log(data);
 });
  npm.stdout.on('data', (data) => {
   if (fs.existsSync(path.join('/node_modules', answers.package))) {
    console.log("Updating package configuration \n \n" + data);
   }
    console.log("Installing package \n \n" + data);
 });
   npm.on('error', (error) => {
    console.log(error);
 });
  npm.on('close', (code) => {
    if (code){
     console.log(`Process exited with code: ${code}`);
   };
 });
}

function npmInstall(answers) {
  const yarn = spawn('yarn', ['add', `${arguments.installAnyPackage || answers.package} ${arguments}`]);
  yarn.stderr.on('data', (data) => {
   console.log(data);
 });
  yarn.stdout.on('data', (data) => {
   if (fs.existsSync(path.join('/node_modules', answers.package))) {
    console.log("Updating package configuration \n \n" + data);
   }
    console.log("Installing package \n \n" + data);
 });
   yarn.on('error', (error) => {
    console.log(error);
 });
  yarn.on('close', (code) => {
    if (code){
     console.log(`Process exited with code: ${code}`);
   };
 });
} 

function cli(args) {
  let arguments =  argument(args);
  arguments = workingFunction(args);
}

cli();
