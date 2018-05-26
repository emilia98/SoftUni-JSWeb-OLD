const crypto = require('crypto');

let password = 'pesho123';
let password2 = 'pesho123';

let salt = crypto.randomBytes(128);

let hmac = crypto.createHmac('sha1', salt);
let hmac2 = crypto.createHmac('sha1', salt);

let hashedPassword = hmac.update(password).digest('hex');
let hashedPassword2 = hmac2.update(password2).digest('hex');

console.log(hashedPassword);
console.log(hashedPassword2);
