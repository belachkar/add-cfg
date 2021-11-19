const clear = require('clear');
const figlet = require('figlet');

const cmds = require('./lib/cmds');
const files = require('./lib/files');
const { dbgMsg: dbg } = require('./lib/utils');

clear();

dbg.banner(figlet.textSync('Add It', { horizontalLayout: 'full' }));

const run = async () => {
  try {
    const choices = await cmds.listOptionalFiles();
    // dbg.info(JSON.stringify(choices, null, 2));

    files.copyFiles(choices.files);
  } catch (err) {
    dbg.err(err.message || err);
  }
};

run();