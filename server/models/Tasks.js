const mongoose = require('mongoose');
const { Schema, model } = mongoose

const TasksSchema = new Schema({
    id: { type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    category: {type: String, required: true},
    status: {type: String, required: true},
    dueDate: {type: Date, required: true}
})

const TasksModel = model('tasks', TasksSchema)

module.exports = TasksModel