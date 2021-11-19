const path = require('path');
const fs = require('fs');
const { dbgMsg: dbg } = require('./utils');

module.exports = {
  getCurrentDirBase: () => {
    return path.basename(process.cwd());
  },
  isDirExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  copyFiles: (files) => {
    if (!files || !files.length) return;

    const destDir = process.cwd();
    const filesMap = {
      headers: '_headers',
      redirects: '_redirects',
      netlify: 'netlify.toml',
      tsconfig: 'tsconfig.json',
      gitignore: '.gitignore',
      eslint: '.eslintrc.json',
    };

    files.forEach((file) => {
      const srcFileName = filesMap[file];
      const srcFilePath = path.join(__dirname, '..', 'files', srcFileName);
      const destFilePath = path.join(destDir, srcFileName);

      try {
        fs.copyFileSync(srcFilePath, destFilePath, fs.constants.COPYFILE_EXCL);
        dbg.ok(`✓ ${srcFileName} was copied to ${destFilePath}`);
      } catch (err) {
        if (err.code === 'EEXIST') return dbg.info(`! ${err.message}`);
        throw new Error('Error from "files.js" on copying file:\n => ' + err.message || err);
      }
    });
  },
};
