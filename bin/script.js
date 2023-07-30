#!/usr/bin/env node
const inquirer = require('inquirer');

const QUESTIONS = [
  {
    type:"input",
    message:"Project name:",
    default:"Chrome-Ext-project",
    name:"project_name"
  },
  {
    type:"confirm",
    message:"Have you created a GitHub repo for this project?",
    name:"repoGithub"
  },
  {
    type:"input",
    message:"GitHub Repo link(https):",
    name:"repo",
    when(answers) {
      return answers.repoGithub;
    },
  },
  {
      type:"list",
      message:"Would you like to use a framework?:",
      name:"framework",
      choices:["react","vanilla"]
  },
  {
    type:"list",
    message:"which variant would you prefer?:",
    name:"variant",
    choices:["Typescript","Javascript"]
  },
  {
    type:"confirm",
    message:"would you like to use tailwind css?:",
    name:"tailwind"
  }
]



inquirer
  .prompt(QUESTIONS)
  .then(answers => {
    console.log(answers);
  });