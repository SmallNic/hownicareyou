var mongoose = require('mongoose');

var TestmakerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  testtakers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Testtaker'}]
});

//Register this model with with the global mongoose object we imported using require() so that it can be used to interact with the database anywhere else mongoose is imported.
mongoose.model('Testmaker', TestmakerSchema)
