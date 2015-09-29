var mongoose = require('mongoose');

var TesttakerSchema = new mongoose.Schema({
  name: String,
  score: Number,
  testmaker: {type: mongoose.Schema.Types.ObjectId, ref: 'Testmaker'}
});

mongoose.model('Testtaker', TesttakerSchema);
