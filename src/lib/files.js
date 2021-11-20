const path = require('path');
const fs = require('fs');

const { dbgMsg: dbg } = require('./utils');

module.exports = {
  getCurrentDirBase: () => path.basename(process.cwd()),
  isDirExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  // TODO: Add force options to override existing files
  copyFiles: (files) => {
    if (!files || !files.length) return;

    const destDir = process.cwd();
    const filesMap = {
      headers: { srcFileName: '_headers', destFileName: '_headers' },
      redirects: { srcFileName: '_redirects', destFileName: '_redirects' },
      netlify: { srcFileName: 'netlify.toml', destFileName: 'netlify.toml' },
      tsconfig: { srcFileName: 'tsconfig.json', destFileName: 'tsconfig.json' },
      gitignore: { srcFileName: 'gitignore', destFileName: '.gitignore' },
      eslint: { srcFileName: '.eslintrc.json', destFileName: '.eslintrc.json' },
    };

    files.forEach((file) => {
      const { srcFileName, destFileName } = filesMap[file];
      const srcFilePath = path.join(__dirname, '..', 'files', srcFileName);
      const destFilePath = path.join(destDir, destFileName);

      try {
        fs.copyFileSync(srcFilePath, destFilePath, fs.constants.COPYFILE_EXCL);
        dbg.ok(`✓ ${srcFileName} was copied to ${destFilePath}`);
      } catch (err) {
        if (err.code === 'EEXIST') return dbg.info(`!Warn: file already exists: ${destFilePath}`);
        throw new Error('Error from "files.js" on copying file:\n => ' + err.message || err);
      }
    });
  },
};
