const inquirer = require('inquirer');
const fs = require('fs');

async function projectSetup() {

const answers = await inquirer.prompt([
  {
    type: 'text',
    name: 'project',
    message: "Project Name: "
  }
]);
  fs.mkdir(answers.text);
}