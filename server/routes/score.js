const express = require('express');
const scoreRoutes = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
 
// Get a list of all the scores.
scoreRoutes.route('/scores').get(function (req, res) {
  let db_connect = dbo.getDb('scoreList');
  db_connect
    .collection('scores')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// Get a single score by id
scoreRoutes.route('/score/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection('scores')
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// Create a new score.
scoreRoutes.route('/score/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  };
  db_connect.collection('scores').insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
// Update a score by id.
scoreRoutes.route('/update/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    },
  };
  db_connect
    .collection('scores')
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
      response.json(res);
    });
});
 
// Delete a score
scoreRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('scores').deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});
 
module.exports = scoreRoutes;