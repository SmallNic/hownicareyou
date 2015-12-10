var express = require('express');
var router = express.Router();
module.exports = router;
var mongoose = require('mongoose');
var Testmaker = mongoose.model('Testmaker');
var Question = mongoose.model('Question');
var Testtaker = mongoose.model('Testtaker');

/* GET home page.*/
router.get('/', function(req, res, next) {
  console.log("router.get '/'")

  res.render('index', { title: 'Express' });
});


router.get('/testmakers', function(req, res, next) {
  console.log("router.get '/testmakers'")

  Testmaker.find(function(err, testmakers){
    if(err){ return next(err); }
    res.json(testmakers)
  })
})

router.post('/testmakers', function(req, res, next){
  console.log("router.post '/testmakers'")

  var testmaker = new Testmaker(req.body);

  testmaker.save(function(err, testmaker){
    if(err){ return next(err); }
    console.log("testmaker", testmaker)
    res.json(testmaker)
  })
})

// Now when we define a route URL with :testmaker in it, this function will be run first. Assuming the :testmaker parameter contains an ID, our function will retrieve the testmaker object from the database and attach it to the req object after which the route handler function will be called.
router.param('testmaker', function(req, res, next, id){
  console.log("router.param 'testmaker'")

  var query = Testmaker.findById(id);

  query.exec(function(err, testmaker){
    if(err){ return next(err); }
    if (!testmaker){ return next(new Error('can\'t find testmaker')); }

    req.testmaker = testmaker;
    return next();
  })
})

router.get('/testmakers/:testmaker', function(req, res, next){
  console.log("router.get '/testmakers/:testmaker'")

  req.testmaker.populate('questions', function(err, testmaker){
    if (err){ return next(err); }

    req.testmaker.populate('testtakers', function(err, testmaker){
      if (err){ return next(err); }
      res.json(testmaker)
    })

  })

})

router.post('/testmakers/:testmaker/questions', function(req, res, next){
  console.log("router.post '/testmakers/:testmaker/questions'")
  var question = new Question(req.body);
  console.log("question", question)
  question.testmaker = req.testmaker // this questions's testmaker is the testmaker identified in the parameter

  question.save(function(err, question){
    if(err){ console.log("error - question not saved"); return next(err); }
    console.log ("question saved")

    req.testmaker.questions.push(question);
    req.testmaker.save(function(err, testmaker){
      if(err){ console.log("error - testmaker not saved"); return next(err); }
      console.log ("testmaker saved")
      res.json(question)
    })
  })
})

router.post('/delete', function( req, res, next ){
  console.log("remove question - SERVER")
  console.log("req", req.body)
  question  = req.body
  id = req.body._id
  Question.remove({_id: id}, function(err){
    if(err){ console.log("error - question not saved"); return next(err); }
    console.log ("question deleted")
    res.json(question)
  })
  // console.log("res", res)
  // console.log("next", next)
})

router.post('/testmakers/:testmaker/testtakers', function(req, res, next){
  console.log("router.post '/testmakers/:testmaker/testtakers'")
  var testtaker = new Testtaker(req.body);
  console.log("testtaker", testtaker)
  testtaker.testmaker = req.testmaker // this testtakers testmaker is the testmaker identified in the parameter

  testtaker.save(function(err, testtaker){
    if(err){ console.log("error - question not saved"); return next(err); }
    console.log ("testtaker saved", testtaker)

    req.testmaker.testtakers.push(testtaker);
    req.testmaker.save(function(err, testmaker){
      if(err){ console.log("error - testmaker not saved"); return next(err); }
      console.log ("testmaker saved")
      res.json(testtaker)
    })
  })
})

router.param('question', function(req, res, next, id){
  console.log("router.param 'questions'")

  // console.log("id = ", id)
  var query = Question.findById(id);
  query.exec(function(err, question){
    if(err){ return next(err); }
    if(!question) { return next(new Error('can\'t find question'));}
    req.question = question;
    return next();
  })
})

router.param('testtaker', function(req, res, next, id){
  console.log("router.param 'testtaker'")

  // console.log("id = ", id)
  var query = Testtaker.findById(id);
  query.exec(function(err, testtaker){
    if(err){ return next(err); }
    if(!testtaker) { return next(new Error('can\'t find testtaker'));}
    req.testtaker = testtaker;
    return next();
  })
})
