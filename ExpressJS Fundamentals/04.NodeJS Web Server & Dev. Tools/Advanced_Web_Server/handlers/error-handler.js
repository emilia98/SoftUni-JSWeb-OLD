const fs = require('fs');

module.exports = (req, res) => {
    //if(true){
        fs.readFile("./error404.html", "utf-8", (err, html) => {
            if(err){
                console.log(err.message);
                res.end(); // If there is an error and we don't have this line, the server won't end the respond process
                return;
            }

            res.writeHead(404, {
                'content-type': 'text/html'
            });
            res.write(html);
            res.end();
        });
    //}else{
        //return true;
    //}
}