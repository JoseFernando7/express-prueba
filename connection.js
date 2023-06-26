const mongoose = require('mongoose');
//const PASSWORD = require('./password');

const connectionString = process.env.MONGODB_URI;

// Connect to mongodb
mongoose.connect(connectionString)
  .then(() =>
  {
    console.log('Database connection successful');
  }).catch((err) =>
  {
    console.log(err);
  });

// const note = new Note(
//   {
//     content: 'Arroz con pollo',
//     date: new Date(),
//     important: true
//   });

// note.save().then(result =>
// {
//   console.log(result);
//   mongoose.connection.close();
// }).catch(err =>
// {
//   console.log(err);
// });
