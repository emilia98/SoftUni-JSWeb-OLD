const fs = require('fs');

module.exports = (req, res) => {
    if(req.path === "/"){
        fs.readFile('./index.html', "utf-8", (err, text) => {
            if(err){
                res.end(); // If there is an error and we don't have this line, the server won't end the respond process
                return;
            }
    
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(text);
            res.end();
        });
    }else{
        return true;
    }
}