const formidable = require('formidable');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');
const ObjectId = require('mongoose').Types.ObjectId;

function sendError (res) {
  res.writeHead(500, {
    'Content-Type': 'text/html'
  });

  res.write('<h1>Error 500 - Server Error</h1>');
  res.end();
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res);
  } else {
    return true;
  }
};

function addImage (req, res) {
  let form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }

    let url = fields.imageUrl;
    let description = fields.description;
    let tagsId = fields.tagsId.split(/\s*,\s*/).filter(el => el !== '');
    let title = fields.imageTitle;
    let filteredIds = [];

    let added = [];
    for (let tag of tagsId) {
      if (!added.includes(tag)) {
        added.push(tag);
        filteredIds.push(ObjectId(tag));
      }
    }

    let image = new Image({
      url,
      title,
      description,
      tags: filteredIds
    });

    image
      .save()
      .then((img) => {
        for (let tagId of filteredIds) {
          Tag
            .findOneAndUpdate(
              {_id: tagId},
              { $push: { images: img._id } },
              function (err, data) {
                if (err) {
                  console.log(err.message);
                  sendError(res);
                  return;
                }

                res.writeHead(302, {
                  'Location': '/'
                });
                res.end();
              });
        }
      })
      .catch(err => {
        console.log(err.message);
        sendError(res);
      });
  });
}

function deleteImg (req, res) {
  let id = req.pathquery.id;

  Image
    .findById(ObjectId(id))
    .then(img => {
      img.remove()
        .then(data => {
          let imageTags = img.tags;

          // Remove this image from tags, where we can find it
          for (let tagId of imageTags) {
            Tag.findById({_id: ObjectId(tagId)})
              .then((tag) => {
                let imgIndex = tag.images.indexOf(id);
                tag.images.splice(imgIndex, 1);

                tag.save()
                  .then(p => {
                    res.writeHead(302, {
                      'Location': '/'
                    });
                    res.end();
                  }).catch(err => console.log(err));
              }).catch(err => console.log(err));
          }
        });
    }).catch(err => console.log(err));
}
