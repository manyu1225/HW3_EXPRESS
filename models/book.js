const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author : { type: mongoose.Schema.ObjectId, ref:'authors' },
    title: String
  }, { versionKey: false }
  );

const book  = mongoose.model(
    'books', bookSchema
);

module.exports = book ;


