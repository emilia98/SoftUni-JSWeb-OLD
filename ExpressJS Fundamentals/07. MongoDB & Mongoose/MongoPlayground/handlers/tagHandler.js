const Tag = require('mongoose').model('Tag');
const formidable = require('formidable');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return;
      }

      let tagName = fields.tagName;

      Tag.create({
        tagName,
        images: []
      }).then(tag => {

        res.writeHead(302, {
          'Location': '/'
        });
        res.end();
      }).catch(err => {
        console.log(err);

        res.writeHead(500, {
          'Content-Type': 'text/html'
        });

        res.end('Error 500 - Server Error');
      });
    });
  } else {
    return true;
  }
};
