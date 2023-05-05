const { stdout } = process;
const fs = require('fs');
const path = require('path');
const arrayOfstyles = [];

const pathStylesFolder = path.join(__dirname, 'styles');
const pathProjectDist = path.join(__dirname, 'project-dist');
const pathBundle = path.join(pathProjectDist, 'bundle.css');

async function mergeStyles() {
  try {
    
    await fs.promises.writeFile(pathBundle, '', 'utf8');
    const filesFromStyleFolder = await fs.promises.readdir(pathStylesFolder);

    for (let file of filesFromStyleFolder) {
      let filePath = path.join(pathStylesFolder, file);
      let stats = await fs.promises.stat(filePath);
      if ((stats.isFile()) && (path.extname(file).slice(1) === 'css')) {
        let fileContent = await fs.promises.readFile(filePath, 'utf-8');
        arrayOfstyles.push(fileContent);
        await fs.promises.writeFile(pathBundle, arrayOfstyles.join('\n'), 'utf8');
      }
    }
    stdout.write('\n-----> Css bundle completed <-----\n');

  } catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}
mergeStyles();
