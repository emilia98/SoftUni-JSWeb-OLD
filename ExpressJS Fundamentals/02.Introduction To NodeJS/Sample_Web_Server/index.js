const http = require('http');

const app = http.createServer((request, response) => {
    let url = request.url;

    if(url === "/"){
        response.write("My Home Page");
    }else if(url === "/about"){
        response.write("My About Page");
    }else if(url === "/contacts"){
        response.write("My Contacts Page");
    }else{
        response.write("Error 404: Not Found");
    }
   
    response.end();
})

let port = '5000';
app.listen(port);

console.log(`Server listening on port ${port}...`);