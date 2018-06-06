const fs = require('fs');
const path = require('path');
const url = require('url');
const formidable = require('formidable');
const shortId = require('shortid');

const promisify = require('../modules/promisify');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readDir = promisify(fs.readdir);
const mkDir = promisify(fs.mkdir);
const rename = promisify(fs.rename);

const dirStructurePath = path.normalize(
  path.join(__dirname, '../database/folder.js')
);

const memeDb = path.normalize(
  path.join(__dirname, '../database/memeDb.json')
);

let folderName = '';

async function loadDb () {
  let memes = await readFile(memeDb, 'utf8');

  try {
    memes = JSON.parse(memes);
  } catch (err) {
    memes = [];
  }
  return memes;
}

async function updateDb (memes) {
  await writeFile(memeDb, JSON.stringify(memes));
}

async function countFiles () {
  let folders = await readFile(dirStructurePath, 'utf8');
  folders = JSON.parse(folders);

  if (folders.length === 0) {
    folderName = 0;
  } else {
    folderName = folders[folders.length - 1];
  }

  let folderPath = path.normalize(
    path.join(__dirname, '../public/uploads/', folderName.toString())
  );

  try {
    let data = await readDir(folderPath);
    if (data.length >= 10) {
      folderName = folders[folders.length - 1] + 1;
      folders.push(folderName);
      await mkDir('public/uploads/' + folderName.toString());
      await writeFile(dirStructurePath, JSON.stringify(folders));
    }
  } catch (err) {
    try {
      folderName = 0;
      await mkDir('public/uploads/' + folderName.toString());
      folders = [];
      folders.push(folderName);
      await writeFile(dirStructurePath, JSON.stringify(folders));
    } catch (err2) {
      console.log(err2);
    }
  }
}

async function loadFile (fileName) {
  let filePath = path.normalize(
    path.join(__dirname, '../', 'views/', fileName)
  );

  let html = await readFile(filePath, 'utf8');
  return html;
}

function renderFile (res, html) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(html);
  res.end();
}

async function renameFile (oldPath, newPath) {
  let uploadFolderPath = path.normalize(
    path.join(__dirname, '../public/uploads/', folderName.toString(), '/', newPath)
  );
  await rename(oldPath, uploadFolderPath);
}

async function wrap (oldPath, newPath) {
  await renameFile(oldPath, newPath);
}

async function addMeme (req, res) {
  if (req.pathname === '/addMeme') {
    if (req.method === 'GET') {
      let fileName = 'addMeme.html';
      let html = await loadFile(fileName);
      renderFile(res, html);
    } else if (req.method === 'POST') {
      await countFiles();
      let memes = await loadDb();

      let uploadDir = path.normalize(
        path.join(__dirname, '../public/uploads/not')
      );
      let form = new formidable.IncomingForm({
        uploadDir: uploadDir
      });

      let meme = {};

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err);
          return;
        }
        let oldPath = files.meme.path;
        let fileName = files.meme.name;

        let newPath = 'upload_' + shortId.generate() + '_' + fileName;
        let imagePath = path.normalize(
          path.join('./public/uploads/', folderName.toString(), newPath)
        );

        let memeTitle = fields.memeTitle;
        let imageName = fileName;
        let status = fields.status;
        let memeDescription = fields.memeDescription;

        if (memeTitle.length > 0 && imageName.length > 0 &&
            status.length > 0 && memeDescription.length > 0) {
          meme.id = 'meme_' + shortId.generate();
          meme.title = memeTitle;
          meme.privacy = status;
          meme.dateStamp = new Date().toLocaleString();
          meme.description = memeDescription;
          meme.memeSrc = imagePath;

          wrap(oldPath, newPath);

          memes.push(meme);
          updateDb(memes);

          res.writeHead(302, {
            'Location': '/'
          });
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.write('<h1>You did something you should not have done...</h1>');
        }
        res.end();
      });
    } else {
      let fileName = 'forbidden.html';
      let html = loadFile(fileName);
      renderFile(res, html);
    }
  } else {
    return true;
  }
}

async function showDetails (req, res) {
  if (req.pathname.startsWith('/getDetails')) {
    if (req.method === 'GET') {
      let query = url.parse(req.url).query;
      let memeId = query.match(/meme_[\w]+/)[0];

      let fileName = 'details.html';
      let html = await loadFile(fileName);
      // Here, manipulate the html for the desired results

      let memesList = await loadDb();
      let memeFound = memesList.filter(m => m.id === memeId)[0];

      if (!memeFound) {
        // TODO: -> redirect to page not found
        res.end('NOT FOUND');
        return;
      }

      let memeTemplate = '';

      memeTemplate = `<div class="content">
      <img src="${memeFound.memeSrc}" alt=""/>
      <h3>Title: ${memeFound.title}</h3>
      <p> ${memeFound.description}</p>
      <a href="/download/${memeFound.memeSrc}"><button>Download Meme</button></a>
      </div>`;

      html = html.replace(
        '<div id="replaceMe">{{replaceMe}}</div>',
        memeTemplate
      );

      await renderFile(res, html);
    } else {
      let fileName = 'forbidden.html';
      let html = loadFile(fileName);
      renderFile(res, html);
    }
  } else {
    return true;
  }
}

async function getAll (req, res) {
  if (req.pathname === '/viewAllMemes') {
    if (req.method === 'GET') {
      let fileName = 'viewAll.html';
      let html = await loadFile(fileName);
      // Here, manipulate the html for the desired results
      let memes = await loadDb();

      memes = memes.filter(m => m.privacy === 'public');
      memes = memes.sort((a, b) => {
        let dateA = Date.parse(a.dateStamp);
        let dateB = Date.parse(b.dateStamp);
        return dateB - dateA;
      });

      let generatedMemes = [];
      for (let meme of memes) {
        let template = `<div class="meme"><a href="/getDetails?id=${meme.id}"><img class="memePoster" src="${meme.memeSrc} "/></a></div>`;
        generatedMemes.push(template);
      }

      html = html.replace(
        '<div id="replaceMe">{{replaceMe}}</div>', generatedMemes.join(''));

      renderFile(res, html);
    } else {
      let fileName = 'forbidden.html';
      let html = loadFile(fileName);
      renderFile(res, html);
    }
  } else {
    return true;
  }
}

module.exports = {
  addMeme: (req, res) => addMeme(req, res),
  showDetails: (req, res) => showDetails(req, res),
  getAll: (req, res) => getAll(req, res)
};
