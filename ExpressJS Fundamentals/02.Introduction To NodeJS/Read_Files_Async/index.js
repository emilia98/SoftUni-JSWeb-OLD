const fs = require('fs');

let text = fs.readFile("./package.json", "utf8", (err, text) => {
    if(err){
        console.warn("Error occured!");
        console.warn(err);
        return;
    }

    let config = JSON.parse(text);
    console.log(config.author);   
    console.log("Finished"); 
});

console.log("Not finished yet!");