const inquirer = require('./inquirer');

module.exports = {
  listOptionalFiles: async () => {
    const answers = await inquirer.askListFilesToCreate();
    return answers;
  },
};
