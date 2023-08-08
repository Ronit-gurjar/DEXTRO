#!/usr/bin/env node
const inquirer = require('inquirer');
const CURR_DIR = process.cwd();
const kleur = require('kleur');
const fs = require('fs');
const path = require('path');
const gradient = require('gradient-string');

const repoValidator = async (input) => {
  if (!input.includes("https://github.com/")) {
     return 'Invalid repo';
  }
  return true;
};

const QUESTIONS = [
  {
    type:"input",
    message:"Your name:",
    name:"author_name",
  },
  {
    type:"input",
    message:"Project name:",
    default:"Chrome-Ext-project",
    name:"project_name",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
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
    validate: repoValidator,
    when(answers) {
      return answers.repoGithub;
    }
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

// Create Package.Json for selected project   
function createPackageJson(templatePath, projectName, repoUrl, projectAuthor) {
    const projectPath = path.join(CURR_DIR, projectName);
    const react_ts_tailwind = {
      "name": projectName,
      "version": "1.0.0",
      "description": "Simple Chrome extension",
      "main": "popup.js",
      "scripts": {
        "watch": "webpack --watch --progress --config webpack.config.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": repoUrl
      },
      "keywords": [
        "React",
        "Chrome-extension",
        "Chrome-boilerplate"
      ],
      "author": projectAuthor,
      "license": "ISC",
      "bugs": {
        "url": repoUrl+"/issues"
      },
      "homepage": repoUrl+"#readme",
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "ts-loader": "^9.4.4",
        "typescript": "^5.1.6"
      },
      "devDependencies": {
        "@types/chrome": "^0.0.242",
        "@types/react": "^18.2.17",
        "@types/react-dom": "^18.2.7",
        "autoprefixer": "^10.4.14",
        "copy-webpack-plugin": "^11.0.0",
        "css-loader": "^6.8.1",
        "html-webpack-plugin": "^5.5.3",
        "postcss": "^8.4.27",
        "postcss-loader": "^7.3.3",
        "style-loader": "^3.3.3",
        "tailwindcss": "^3.3.3",
        "webpack": "^5.88.2",
        "webpack-cli": "^5.1.4"
      }
    };
    const packageJsonString = JSON.stringify(react_ts_tailwind, null, 2);
    const packageJsonPath = projectPath + '/package.json';
    fs.writeFileSync(packageJsonPath, packageJsonString);
}


inquirer
  .prompt(QUESTIONS)
  .then(answers => {
    const projectName = answers['project_name']; //string
    const projectAuthor = answers['author_name'] //string
    const repoUrl = answers['repo']; //string
    const frameworkChoice = answers['framework']; //string
    const variant = answers['variant']; //string
    const wantTailwind = answers['tailwind']; //boolean
    function projectChoice(){
      if (frameworkChoice === "react") {
        if (variant ==="Typescript") {
          if (wantTailwind === true) {
            return 'react-ts-tailwind';
          }
          else{
            return 'react-ts';
          }}
        else if (variant === 'Javascript') {
            if (wantTailwind === true) {
              return 'react-js-tailwind';
            }
            else{
              return 'react-js';
            }}
        }
      else if(frameworkChoice === "vanilla"){
        return 'vanilla';
      }
      }
    const templatePath = `${__dirname}/templates/${projectChoice()}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`); // make directory with project name in cwd
    createDirectoryContents(templatePath, projectName); // copy contents of templatepath to projectName
    createPackageJson(templatePath, projectName, repoUrl, projectAuthor);
    
    //Console Print
    function style(){
      if (templatePath.includes('tailwind')) {
       return ' & tailwindCSS';
      } else {
        return ' & no tailwindCSS';
      }
    }
    console.log(gradient.teen('\n------------------------PROJECT SUCCESSFULLY CREATED------------------------'))
    console.log(kleur.bgGreen( "Created "+ kleur.red(projectName) +" on "+ repoUrl +" repo, with "+ frameworkChoice +" + "+ variant + style() + " for " + kleur.red(projectAuthor)));
    console.log(kleur.blue('Now just perform :'))
    console.log(`
    > cd ${projectName}
    > code .
    > npm install  
    `)
    const text = kleur.bgGreen('Read Docs to know more :');
    const link = kleur.blue('https://github.com/Ronit-gurjar/React-Chrome-Extension-Boilerplate#readme');
    console.log(`${text} ${link}`);
    console.log(gradient.teen('-------------------------------ENJOY BUILDING-------------------------------\n'))
  });

   
function createDirectoryContents (templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      if (file === '.npmignore') file = '.gitignore';
      
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      
      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}