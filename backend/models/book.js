const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema= new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    edition: {type: String, required: true},
    publisher: {type: String, required: true},
    gender: {type: String, required: true},
    img: {type: String, required: true},

    bookAnalyst: [{type: Schema.Types.ObjectId, ref: 'BookAnalyst'}],
});

module.exports = mongoose.model("Book", schema)