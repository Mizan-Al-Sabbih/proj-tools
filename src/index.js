const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

async function projectSetup() {

const answers = await 
inquirer
  .prompt([
  {
    type: 'text',
    name: 'project',
    message: 'Project Name: '
  }
 ]);
  fs.mkdirSync(answers.project);
}

projectSetup();
