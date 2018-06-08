const fs = require('fs');
const path = require('path');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');
const promisify = require('../modules/promisify');
const ObjectId = require('mongoose').Types.ObjectId;

const readFile = promisify(fs.readFile);
const htmlPath = path.normalize(
  path.join(__dirname, '../views/results.html')
);

function sendError (res) {
  res.writeHead(500, {
    'Content-Type': 'text/html'
  });

  res.write('<h1>Error 500 - Server Error</h1>');
  res.end();
}

async function getImages (query, limitCount) {
  let tags = await Tag.find(query.tags);

  let imgsById = [];
  let distinctImages = [];

  for (let tag of tags) {
    let tagImg = tag.images;

    for (let imgId of tagImg) {
      if (!distinctImages.includes(imgId.toString())) {
        distinctImages.push(imgId.toString());
        imgsById.push(ObjectId(imgId));
      }
    }
  }

  let imgs = await Image
    .where('_id').in(imgsById)
    .find(query.creationDate)
    .sort('-creationDate')
    .limit(limitCount);

  // console.log(imgs);
  return imgs;
}

async function renderFile (res, html) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(html);
  res.end();
}

async function searchImages (req, res) {
  let requestQuery = req.pathquery;
  let tagNames = requestQuery.tagName;
  let afterDate = new Date(requestQuery.afterDate);
  let beforeDate = new Date(requestQuery.beforeDate);
  let limit = parseInt(requestQuery.Limit);

  let query = {};

  if (tagNames.length === 0) {
    query.tags = {};
  } else {
    query.tags = { 'tagName': { $in: tagNames.split(/\s*,\s*/) } };
  }

  query.afterDate = {};
  query.beforeDate = {};
  query.creationDate = {};
  if (!isNaN(afterDate) || !isNaN(beforeDate)) {
    query.creationDate.creationDate = {};

    if (isNaN(afterDate) === false) {
      query.creationDate.creationDate.$gte = afterDate;
    }

    if (isNaN(beforeDate) === false) {
      query.creationDate.creationDate.$lt = beforeDate;
    }
  }

  let html = await readFile(htmlPath, 'utf8');

  try {
    let images;
    if (!isNaN(limit) && limit > 0) {
      images = await getImages(query, limit);
    } else {
      images = await getImages(query, 10);
    }

    let imagesHtml = [];
    for (let image of images) {
      let template =
        `<fieldset> <legend>${image.title}:</legend> 
        <img src="${image.url}">
        </img><p>${image.description}<p/>
        <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
        </button> 
        </fieldset>`;
      imagesHtml.push(template);
    }

    html = html.replace(
      `<div class='replaceMe'></div>`,
      imagesHtml.join('')
    );

    await renderFile(res, html);
  } catch (err) {
    console.log(err);
    sendError(res);
  }
}

function search (req, res) {
  if (req.pathname === '/search') {
    searchImages(req, res);
  } else {
    return true;
  }
}

module.exports = {
  searching: (req, res) => search(req, res)
};
