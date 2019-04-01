const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/marriage', {
  useNewUrlParser: true
});

app.listen(3000, () => console.log('Server listening on port 3000!'));


// Create a scheme for items in the museum: a title and a path to an image.
const commentSchema = new mongoose.Schema({
	author: String,
	comment: String
});

// Create model for comments for the eternal page.
const EternalComment = mongoose.model('eternal_comment', commentSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/eternal_comments', async (req, res) => {
	const comment = new EternalComment({
		author: req.body.author,
		comment: req.body.comment
	});
	try {
		await comment.save();
		res.send(comment);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Get a list of all of the items in the museum.
app.get('/api/eternal_comments', async (req, res) => {
	try {
		let comments = await EternalComment.find();
		res.send(comments);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Delete an item in the museum: takes an id.
app.delete('/api/eternal_comments/:id', async (req, res) => {
	try {
		await EternalComment.deleteOne({ _id: req.param("id") });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Edit an item in the museum: takes an id.
app.put('/api/eternal_comments/:id', async (req, res) => {
	try {
		let comment = await EternalComment.findOne({ _id: req.param("id") });
		comment.author = req.body.author;
		comment.comment = req.body.comment;
		await comment.save();
		res.send(comment);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});


// Create model for comments for the plural page.
const PluralComment = mongoose.model('plural_comment', commentSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/plural_comments', async (req, res) => {
	const comment = new PluralComment({
		author: req.body.author,
		comment: req.body.comment
	});
	try {
		await comment.save();
		res.send(comment);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Get a list of all of the items in the museum.
app.get('/api/plural_comments', async (req, res) => {
	try {
		let comments = await PluralComment.find();
		res.send(comments);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Delete an item in the museum: takes an id.
app.delete('/api/plural_comments/:id', async (req, res) => {
	try {
		await PluralComment.deleteOne({ _id: req.param("id") });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Edit an item in the museum: takes an id.
app.put('/api/plural_comments/:id', async (req, res) => {
	try {
		let comment = await PluralComment.findOne({ _id: req.param("id") });
		comment.author = req.body.author;
		comment.comment = req.body.comment;
		await comment.save();
		res.send(comment);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

