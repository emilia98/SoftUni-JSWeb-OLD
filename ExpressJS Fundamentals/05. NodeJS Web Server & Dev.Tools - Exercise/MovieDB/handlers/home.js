const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.pathname === '/' && req.method === 'GET') {
      let filePath = path.normalize('./views/home.html'
         
      );
       //path.join('./views/home.html')

      fs.readFile(filePath, 'utf8', (err, data) => {
          if(err) {
              console.log(err);
              res.end();
              return;
          }

          res.writeHead(200, {
              'Content-Type': 'text/html'
          });

          res.write(data);

          res.end();
      });
  } else {
    return true;
  }
}