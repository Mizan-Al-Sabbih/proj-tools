const { spawn } = require('child_process');
const inquirer = require('inquirer');
const arg = require('arg');

function argument(argv) {
  const args = arg(
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
      argv: process.argv.slice(2)
    }
  );
  return {
    installGlobally: args['--global'] || false,
    saveInDevdependencies: args['--save-dev', '--save-prod'] || false,
    installAnyPackage: args._[0],
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

 function npmInstall(answers) {
  const npm = spawn('npm', ['install', `${arguments.installAnyPackage || answers.package} ${arguments}`]);
  npm.stderr.on('data', stderr => {
   console.log(stderr.toString());
 });
  npm.stdout.on('data', stdout => {
    console.log("Installing package \n \n" + stdout.toString());
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

function yarnInstall(answers) {
  const yarn = spawn('yarn', ['add', `${arguments.installAnyPackage || answers.package} ${arguments}`]);
  yarn.stderr.on('data', stderr => {
   console.log(stderr.toString());
 });
  yarn.stdout.on('data', stdout => {
    console.log("Installing package \n \n" + stdout.toString());
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

async function cli(args) {
  let arguments = argument(args);
  arguments = await workingFunction(args);
}

cli();
