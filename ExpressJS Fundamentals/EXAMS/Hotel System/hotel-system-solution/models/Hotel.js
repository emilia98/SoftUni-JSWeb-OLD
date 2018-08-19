const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const hotelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Category'
    },
    creatorId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    creationDate: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.SchemaTypes.ObjectId,
        default: []
    }]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
