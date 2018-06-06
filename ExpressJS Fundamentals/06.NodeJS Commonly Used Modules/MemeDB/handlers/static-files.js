const fs = require('fs');
const path = require('path');
const promisify = require('../modules/promisify');

const readFile = promisify(fs.readFile);

function getContentType (path) {
  if (path.endsWith('.css')) {
    return 'text/css';
  }
  if (path.endsWith('.ico')) {
    return 'image/x-icon';
  }
  if (path.endsWith('.png')) {
    return 'image/png';
  }
  if (path.endsWith('.jpeg') || path.endsWith('.jpg')) {
    return 'image/jpeg';
  }
  if (path.endsWith('.gif')) {
    return 'image/gif';
  }
  if (path.endsWith('.js')) {
    return 'application/javascript';
  }
}

async function renderFileContent (req, res, encoding) {
  let filePath = path.normalize(
    path.join(__dirname, '../', req.pathname)
  );

  let content = await readFile(filePath);

  res.writeHead(200, {
    'Content-Type': getContentType(req.pathname)
  });
  res.write(content);
  res.end();
}

module.exports = (req, res) => {
  if (req.pathname.startsWith('/public/') && req.method === 'GET') {
    renderFileContent(req, res);
  } else {
    return true;
  }
};
