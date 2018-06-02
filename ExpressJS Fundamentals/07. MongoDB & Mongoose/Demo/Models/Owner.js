const mongoose = require('mongoose');

let ownerSchema = mongoose.Schema({
  name: {type: String, required: true}
});

let Owner = mongoose.model('Owner', ownerSchema);

module.exports = mongoose.model('Owner');
/* OR
module.exports = Owner;
*/
