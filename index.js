#!/usr/bin/env node
"use strict";

import inquirer from 'inquirer';
import chalk from 'chalk';
import {resume} from "./resume.js" ;
// add response color
const response = chalk.bold.cyan;

const options = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to know?",
  choices: [...Object.keys(resume), "See you!"]
};

function showResume() {
  console.log(`
  Hi there 👋
  I am Lahcene, a ${chalk.greenBright('creative, fullstack')} developer. I am also 
    [x] a father 👶👶
    [x] a chess player ♙
    [x] a bit of a designer 🎨
    [ ] always in progress... 🚧

    You can find more about me on my [website](${chalk.green('https://benzara.me')})
  `);
  handleResume();
}

function handleResume() {
  inquirer.prompt(options).then(answer => {
    if (answer.resumeOptions == "See you!") {
      console.log(response("Thank you for your time!"));
      return;
    }
    const option = resume[`${answer.resumeOptions}`]

    if (option) {
      console.log(response(new inquirer.Separator()));
      option.forEach(info => {
        console.log(response("|   => " + info));
      });
      console.log(response(new inquirer.Separator()));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          handleResume();
        } else {
          console.log(response("Thank you for your time!"));
          return;
        }
      });
  }).catch(err => console.log('Ooops,', err))
}

showResume();
