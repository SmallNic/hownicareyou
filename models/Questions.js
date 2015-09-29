var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  content: String,
  options: [String],
  correctAnswer: String,
  testmaker: {type: mongoose.Schema.Types.ObjectId, ref: 'Testmaker'}
});

mongoose.model('Question', QuestionSchema);
