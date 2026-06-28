const { required } = require('joi');
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task : {
        type: String,
        required: true
    },
    completed : {
        type : Boolean
    }
}, {timestamps: true})

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;