// fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

 inquirer
  .prompt([
  {
    type: 'confirm',
    name: 'project',
    message: 'Project Name: ',
    default: true
  }
]).then(answers => {
  console.log(answers);
});
