const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)