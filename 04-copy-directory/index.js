const { stdout } = process;
const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname, 'files');
const pathCopyDir = path.join(__dirname, 'files-copy');

async function copyDir(inFolder, outFolder) {
  try {
    //await fs.promises.mkdir(outFolder, { recursive: true });
    await fs.promises.rmdir(outFolder, { recursive: true, force: true });
    await fs.promises.mkdir(outFolder, { recursive: true });

    const files = await fs.promises.readdir(inFolder,{withFileTypes: true});
    for (let file of files) {
      if (file.isDirectory()) {
        await fs.promises.mkdir(path.join(outFolder, file.name));
        await copyDir(path.join(inFolder, file.name), path.join(outFolder, file.name));
        stdout.write(`\n ----> Copying directory --> ${file.name} completed`);

      } else {
        await fs.promises.copyFile(path.join(inFolder, file.name), path.join(outFolder, file.name));
      }
      stdout.write(`\n ----> Copying file -> ${file.name} completed`);
    }
  } catch (error) {
    stdout.write('\nWe have some error --> ' + error.message);
  }
}
copyDir(pathDir, pathCopyDir);