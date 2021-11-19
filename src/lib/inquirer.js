const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askListFilesToCreate: () => {
    return inquirer.prompt([
      {
        type: 'checkbox',
        name: 'files',
        message: 'What files do you want to add?',
        pageSize: 5,
        choices: ['headers', 'redirects', 'netlify', 'tsconfig', 'gitignore', 'eslint'],
        default: ['redirects', 'eslint'],
      },
    ]);
  },
  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the repository:',
        default: argv._[0] || files.getCurrentDirBase(),
        validate: (value) => {
          return value.length ? true : 'Please enter a name for the repository.';
        },
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: 'Optionally enter a description of the repository:',
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: ['public', 'private'],
        default: 'public',
      },
    ];
    return inquirer.prompt(questions);
  },
};
