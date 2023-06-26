require('dotenv').config();
require('./connection');

// Create a server with express
const express = require('express');
const app = express();
const cors = require('cors');
const Note = require('./models/Note');
const notFound = require('./middlewares/notFound');
const handleError = require('./middlewares/handleError');

const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Create routes
app.get('/', (req, res) =>
{
  res.send('Hello World!');
});

app.get('/api/notes', (req, res) =>
{
  Note.find({}).then(notes =>
  {
    res.json(notes);
  });
});

app.get('/api/notes/:id', (req, res, next) =>
{
  const { id } = req.params;

  Note.findById(id).then(note =>
  {
    if (note)
    {
      res.json(note);
    }
    else
    {
      res.status(404).end();
    }
  }).catch(error =>
  {
    next(error);
  });
});

app.delete('/api/notes/:id', (req, res, next) =>
{
  const { id } = req.params;

  Note.findByIdAndRemove(id).then(() =>
  {
    res.status(204).end();
  }).catch(error => next(error));
});

app.put('/api/notes/:id', (req, res, next) =>
{
  const { id } = req.params;
  const note = req.body;

  const newNoteInfo = {
    content: note.content,
    important: note.important
  };

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(updatedNote =>
  {
    res.json(updatedNote);
  }).catch(error => next(error));
});

app.post('/api/notes', (req, res) =>
{
  const note = req.body;

  if (!note || !note.content)
  {
    return res.status(400).json({
      error: 'note.content is missing'
    });
  }

  const newNote = new Note(
    {
      content: note.content,
      important: note.important || false,
      date: new Date()
    });

  newNote.save().then(savedNote =>
  {
    res.json(savedNote);
  });
});

app.use(notFound);

app.use(handleError);

// Create the server
app.listen(port, () =>
{
  console.log(`Example app listening at http://localhost:${port}`);
});
