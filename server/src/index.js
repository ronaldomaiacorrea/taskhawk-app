const uuid = require("uuid");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Task = require("./models/task");
dotenv.config();

// const TasksModel = require('./models/Tasks')
const PORT = process.env.PORT || 3001;
const CONNECTION = process.env.CONNECTION;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const task = new Task({
	name: "Finish app",
	description: "Finish my TaskHawk app",
	category: "Programming",
	status: "IN PROGRESS",
	dueDate: "2023-05-31",
});

// MongoDB Connection
mongoose.set("strictQuery", false);

// Queries

app.get("/", (req, res) => {
	res.send("WELCOME!");
});

app.get("/api/tasks", async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

app.get("/api/tasks/:id", async (req, res) => {
	try {
		// req.params is for ids and others that list a specific row.
		// 	req.query is for using filters after the ? mark
		// nested data, after the id, use :otherparam
		const { id: taskId } = req.params;
		const task = await Task.findById(taskId);
		res.status(200).json(task);
	} catch (e) {
		if (e.name === "CastError") {
			res.status(404).json({ error: "User not found" });
		} else res.status(500).json({ error: e.message });
	}
});

app.post("/api/tasks", async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).json(task);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

app.put("/api/tasks/:id", async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const result = await Task.replaceOne({ _id: taskId }, req.body);
		res.json({ updatedCount: result.modifiedCount });
	} catch (e) {
		if (e.name === "CastError") {
			res.status(404).json({ error: "User not found" });
		} else res.status(500).json({ error: e.message });
	}
});

app.delete("/api/tasks/:id", async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const result = await Task.deleteOne({ _id: taskId });
		res.json({ deletedCount: result.deletedCount });
	} catch (e) {
		if (e.name === "CastError") {
			res.status(404).json({ error: "User not found" });
		} else res.status(500).json({ error: e.message });
	}
});

const main = async () => {
	try {
		await mongoose.connect(CONNECTION);
		console.log("Connected to Database");
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
};

main();
