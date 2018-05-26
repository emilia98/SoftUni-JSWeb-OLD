const fs = require('fs');
const path = require('path');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

function promisify (func) {
  return (...params) => {
    return new Promise((resolve, reject) => {
      func(...params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  };
}

let filePath = path.normalize(path.join(__dirname, '../', '../'));

async function copySettings () {
  try {
    await readdir(filePath);

    // Updated path to package.json file
    filePath = path.normalize(path.join(filePath, 'package.json'));
    let settings = await readFile(filePath, 'utf8');
    settings.description = 'This is a demo for fs module.';
    settings = JSON.parse(settings);

    let dirPath = path.normalize(path.join(__dirname, '.././subfolder'));

    /*
       If this folder exists, there will be an error. So we should
       continue, not only to print a message.
       After try-catch block, despite there is an error or not,
       we will continue and will read the folder.
    */
    try {
      await mkdir(dirPath);
    } catch (err) {
      console.log('Error while creating a folder');
    }

    await readdir(dirPath);

    filePath = path.normalize(path.join(__dirname, '.././subfolder/package-copy.json'));
    await writeFile(filePath, JSON.stringify(settings));
    console.log('Operation successful!');
    /* ------------------------------------------------------ */
  } catch (err) {
    console.log(err);
  }
}

copySettings();
