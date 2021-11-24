#!/usr/bin/env node
const clear = require('clear');
const figlet = require('figlet');

const cmds = require('./lib/cmds');
const files = require('./lib/files');
const { dbgMsg: dbg } = require('./lib/utils');

clear();

dbg.banner(figlet.textSync('Add It', { horizontalLayout: 'full' }));

const run = async () => {
  try {
    // TODO: Add project framework detection
    // TODO: Add framework choice
    // TODO: Add newely added files to the choices: .browserslistrc, .editorconfig, .eslintignore
    // TODO: Add also: reactJS/.eslintrc.json
    const choices = await cmds.listOptionalFiles();

    files.copyFiles(choices.files);
  } catch (err) {
    dbg.err(err.message || err);
  }
};

run();
