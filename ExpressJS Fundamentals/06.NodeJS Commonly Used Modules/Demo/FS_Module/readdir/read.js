const fs = require('fs');

// readdirSyn -> No error handling, just returns the data
let data = fs.readdirSync('./');
console.log(data);

// readdir -> With error handling; the data is send in the callback
fs.readdir('./', (err, data2) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data2);
});

fs.readdir('./', (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  let jsonIndex = files.indexOf('package.json');
  fs.readFile('./' + files[jsonIndex], 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let settings = JSON.parse(data);
    settings.description = 'This is a demo for fs module.';  
    console.log(settings);
  });
});
