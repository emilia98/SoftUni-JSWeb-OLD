const fs = require('fs');
const path = require('path');

function getContentType (url) {
  if (url.endsWith('.css')) {
    return 'text/css';
  } else if (url.endsWith('.js')) {
    return 'application/javascript';
  } else if (url.endsWith('.ico')) {
    return 'image/x-icon';
  } else if (url.endsWith('.png')) {
    return 'image/png';
  } else if (url.endsWith('.jpeg')) {
    return 'image/jpeg';
  }
  return 'text/plain';
}

module.exports = (req, res) => {
  getContentType(req.pathname);
  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = path.normalize(
      path.join(__dirname, `..${req.pathname}`)
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html'
        });

        res.write('<h1>Resource not found!</h1>');
        res.end();
        return;
      }

      res.writeHead(200, {
        'Content-Type': getContentType(req.pathname)
      });
      res.write(data);
      res.end();
    });
  } else {
    return true;
  }
};
