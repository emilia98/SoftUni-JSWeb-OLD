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

async function downloadFile (req, res, fileLocation) { 
    let filePath = path.normalize(
        path.join(__dirname, '../', fileLocation)
    );

    let filename = fileLocation.split('/').pop();

try {
    let content = await readFile(filePath);
    //specify Content will be an attachment
    res.setHeader('Content-disposition', 'attachment; filename='+filename);
    res.end(content);
} catch(err) {
   
        res.writeHead(400, {'Content-type': 'text/html'});
        console.log(err);
        res.end("No such file");    
    
}
}

module.exports = (req, res) => {
    if (req.pathname.startsWith('/download/') && req.method === 'GET') {
        let fileLocation = req.pathname.replace('/download/', '');
        // console.log('PATH: ' + fileLocation);
        downloadFile(req, res, fileLocation);
    } else {
        return true;
    }
};