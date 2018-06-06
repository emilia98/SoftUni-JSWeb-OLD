const path = require('path');
const fs = require('fs');
const promisify = require('../modules/promisify');

const readFile = promisify(fs.readFile);
const homeFilePath = path.normalize(
  path.join(__dirname, '../views/home.html')
);

async function showHome (res) {
    let html = await readFile(homeFilePath, 'utf8');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write(html);
    res.end();
}

module.exports = (req, res) => {
    if (req.pathname === '/') {
        if(req.method === 'GET') {
            showHome(res);
        } else {
            res.writeHead(402, {
                'Location': '/forbidden'
            });

            res.end();
        }
    } else {
        return true;
    }
};
