const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    pinned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

notesSchema.plugin(mongoosePaginate);

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;