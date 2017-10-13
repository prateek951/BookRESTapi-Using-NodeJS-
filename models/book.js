var mongoose = require('mongoose');
var BookSchema = mongoose.Schema({
    title : String,
    author : String,
    category : String
});

module.exports = mongoose.model('Book',BookSchema);