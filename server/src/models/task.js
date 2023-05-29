const mongoose = require('mongoose');
const { Schema, model } = mongoose

const TaskSchema = new Schema({    
    name: {type: String, required: true},
    description: {type: String, required: false},
    category: {type: String, required: true},
    status: {type: String, required: true},
    dueDate: {type: Date, required: true}
})

module.exports = model('tasks', TaskSchema)