const { stdout } = process;
const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname, 'files');
const pathCopyDir = path.join(__dirname, 'files-copy');

async function copyDir(dir, copyDir) {
  try {
    
    await fs.promises.mkdir(copyDir, { recursive: true });
    await fs.promises.rmdir(copyDir, { recursive: true, force: true });
    await fs.promises.mkdir(copyDir, { recursive: true });

    const files = await fs.promises.readdir(dir);
    for (let file of files) {
      const mainPath = path.join(dir, file);
      const copyPath = path.join(copyDir, file);
      await fs.promises.copyFile(mainPath, copyPath);
    }
    stdout.write('\n ----> Directory copy completed <---- \n');
  } catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}
copyDir(pathDir, pathCopyDir);