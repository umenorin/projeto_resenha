const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema= new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    rating: {type: Number, required: true},
    
    autor: {type: Schema.Types.ObjectId, ref:'User'},
    book: {type: Schema.Types.ObjectId, ref:'Book'}
});

module.exports = mongoose.model("BookAnalyst", schema)