const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: String,
    introduction: String
  }, { versionKey: false }
);

const Author = mongoose.model(
    'authors', authorSchema
);


module.exports = Author;






