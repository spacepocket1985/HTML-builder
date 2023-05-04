
const { stdout } = process;
const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, (error, files) => {
  if (error) throw error;
  stdout.write('Information about files from a secret folder ------>\n');
  files.forEach((file) => {
    let filePath = path.join(secretFolderPath, file);

    fs.stat(filePath, (error, stats) => {
      if (error) throw error;
      if (stats.isFile()) {
        let fileName = path.basename(file, path.extname(file));
        let fileExtname = path.extname(file).slice(1);
        let fileSize = stats.size / 1024;
        stdout.write(`${fileName} - ${fileExtname} - ${fileSize.toFixed(2)}kb`+'\n');
      }
    });
  });
});