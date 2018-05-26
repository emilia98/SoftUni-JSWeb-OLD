const formidable = require('formidable');
const http = require('http');
const port = 5000;
const path = require('path');

http.createServer((req, res) => {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    let form = formidable.IncomingForm();
    let message = 'Upload is successful...';

    form.on('fileBegin', (name, file) => {
      if (file.name === '') {
        message = 'No file was uploaded...';
        return;
      }

      file.path = path.normalize(path.join('./', __dirname, '/uploads/', file.name));
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        res.end();
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.write(message);
      res.end();
    });
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
  '<input type="text" name="title"><br>' +
  '<input type="file" name="upload" multiple="multiple"><br>' +
  '<input type="submit" value="Upload">' +
  '</form>');
}).listen(port);

console.log(`The server is listening on port ${port}...`);
