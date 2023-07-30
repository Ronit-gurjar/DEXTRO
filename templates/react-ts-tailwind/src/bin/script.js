// Not to be Altered!

const inquirer = require('inquirer');

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type:"list",
        message:"Would you like to use a framework?:",
        name:"framework",
        choices:["react","vanilla"]
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers);
  });