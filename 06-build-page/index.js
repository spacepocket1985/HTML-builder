const { stdout } = process;
const fs = require('fs');
const path = require('path');
const pathProjectDistFolder = path.join(__dirname, 'project-dist');
const pathIndex = path.join(pathProjectDistFolder, 'index.html');
const pathСomponentsFolder = path.join(__dirname, 'components');
const pathTemplete = path.join(__dirname, 'template.html');
const pathStylesFolder = path.join(__dirname, 'styles');
const pathBundle = path.join(pathProjectDistFolder, 'style.css');
const arrayOfstyles = [];
const pathAssets = path.join(__dirname, 'assets');
const pathAssetsCopy = path.join(pathProjectDistFolder, 'assets');

copyDir(pathAssets, pathAssetsCopy);

async function copyDir(inFolder, outFolder) {
  try {
    
    await fs.promises.mkdir(outFolder, { recursive: true });
    await fs.promises.rmdir(outFolder, { recursive: true, force: true });
    await fs.promises.mkdir(outFolder, { recursive: true });

    const files = await fs.promises.readdir(inFolder,{withFileTypes: true});
    for (let file of files) {
      if (file.isDirectory()) {
        await fs.promises.mkdir(path.join(outFolder, file.name));
        await copyDir(path.join(inFolder, file.name), path.join(outFolder, file.name));

      } else {
        await fs.promises.copyFile(path.join(inFolder, file.name), path.join(outFolder, file.name));

      }
      // const mainPath = path.join(dir, file);
      // const copyPath = path.join(copyDir, file);
      // await fs.promises.copyFile(mainPath, copyPath);
    }
    
  } catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}

async function createFolderProjectDist() {
  try {
    // await fs.promises.mkdir(copyDir, { recursive: true });
    // await fs.promises.rmdir(copyDir, { recursive: true, force: true });
    await fs.promises.mkdir(pathProjectDistFolder, { recursive: true });
    stdout.write('\n--> project-dist folder created -->\n');
  }
  catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}

async function workWithTepmplate() {
  try {

    let template = await fs.promises.readFile(pathTemplete, 'utf-8');
    let tempStr;
    let componentData = await createCompomentsData();

    const tempReplace = (str, obj) => { 
      for (let key in obj) {
        if (str.indexOf(`{{${key}}}`) != -1) {
          tempStr = str.replace(`{{${key}}}`, obj[key]);
          tempReplace(tempStr,obj);
        }
      } 
    };
    tempReplace(template,componentData);
    //console.log(tempStr);
    await fs.promises.writeFile(pathIndex, tempStr, 'utf8');
  }

  catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}

async function createCompomentsData() {
  try {
    const filesFromComponentsFolder = await fs.promises.readdir(pathСomponentsFolder);
    let componentData = {};
    for (let file of filesFromComponentsFolder) {
      let filePath = path.join(pathСomponentsFolder, file);
      let stats = await fs.promises.stat(filePath);
      if ((stats.isFile()) && (path.extname(file).slice(1) === 'html')) {
        let fileContent = await fs.promises.readFile(filePath, 'utf-8');
        componentData[file.slice(0, file.indexOf('.html'))] = fileContent;
      }
    }
    return componentData;

  } catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}

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

  } catch (error) {
    stdout.write('\nWe have some erroR --> ' + error.message);
  }
}

createCompomentsData();
createFolderProjectDist();
workWithTepmplate();
mergeStyles();