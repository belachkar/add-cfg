const clear = require('clear');
const figlet = require('figlet');

const dbg = require('./lib/utils').dbgMsg;
const cmds = require('./lib/cmds');

clear();

dbg.banner(figlet.textSync('Add It', { horizontalLayout: 'full' }));

const run = async () => {
  const choices = await cmds.listOptionalFiles();
  console.log(choices);
};

run();
