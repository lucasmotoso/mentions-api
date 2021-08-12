const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    friend: {
        type: String,
        requerid: true,
        trim: true
    },
    mention: {
        type: String,
        requerid: true
    }

});

module.exports = mongoose.model('Mentions', schema);