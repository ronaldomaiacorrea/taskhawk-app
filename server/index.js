const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose')
const TasksModel = require('./models/Tasks')
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// MongoDB Connection
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://ronaldomaia:Secretpass063@hawktasks.n2ckhiv.mongodb.net/taskhawk?retryWrites=true&w=majority";

const main = async () => {
    try {
        await mongoose.connect(mongoDB);
        console.log('Connected to Database');
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
    } catch (e) {
        console.log(e.message)
    }  
}

main();

app.get('/tasks', async (req, res) => {
    const result = res.json();
    res.send(result)
    
})




