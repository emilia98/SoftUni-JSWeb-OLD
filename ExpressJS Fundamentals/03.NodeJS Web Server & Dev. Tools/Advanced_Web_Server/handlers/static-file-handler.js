const fs = require('fs');

module.exports = (req, res) => {
    // WHEN WE LOAD THE CSS AND JS FILES, WE MAKE A REQUEST AND WE NEED TO RESTRICT THE ACCESS TO THEM => 
    if(req.path.startsWith('/content')){
        fs.readFile('.' + req.path, (err, data) => {
            if(err){
                console.log(err);
                res.end();
                return;
            }

            if(req.path.endsWith('.css')){
                
                res.writeHead(200, {
                    'content-type': 'text/css'
                });
            } else if (req.path.endsWith('.js')){
                res.writeHead(200, {
                    'content-type': 'application/javascript'
                })
            }

            if(data){
                res.write(data);
            }

            res.end();
            return;
        });
    }else{
       return true;
    }
}