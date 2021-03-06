
var express = require('express');
var router = express.Router();
var User = require('../models/user').user;
var Users = require('../models/user').users;

var Permission = require('../models/permission').permission;

router.route('/users')
    // fetch all users
    .get(function (req, res) {
      Users.forge()
          .fetch({withRelated: ['permissions']})
          .then(function (collection) {
            res.json({error: false, data: collection.toJSON()});
          })
          .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
    })
    // create a user
    .post(function (req, res) {
      User.forge({
            name: req.body.name,
            email: req.body.email
          })
          .save()
          .then(function (user) {
            res.json({error: false, data: {id: user.get('id')}});
          })
          .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
    });
router.route('/users/:id')
    // fetch user
    .get(function (req, res) {
      User.forge({id: req.params.id})
          .fetch({withRelated: ['permissions']})
          .then(function (user) {
            if (!user) {
              res.status(404).json({error: true, data: {}});
            }
            else {
              res.json({error: false, data: user.toJSON()});
            }
          })
          .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
    })
    // update user details
    .put(function (req, res) {
      User.forge({id: req.params.id})
          .fetch({require: true})
          .then(function (user) {
            user.save({
                  name: req.body.name || user.get('name'),
                  email: req.body.email || user.get('email')
                })
                .then(function () {
                  res.json({error: false, data: {message: 'User details updated'}});
                })
                .catch(function (err) {
                  res.status(500).json({error: true, data: {message: err.message}});
                });
          })
          .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
    })
    // delete a user
    .delete(function (req, res) {
      User.forge({id: req.params.id})
          .fetch({require: true})
          .then(function (user) {
            user.destroy()
                .then(function () {
                  res.json({error: true, data: {message: 'User successfully deleted'}});
                })
                .catch(function (err) {
                  res.status(500).json({error: true, data: {message: err.message}});
                });
          })
          .catch(function (err) {
            res.status(500).json({error: true, data: {message: err.message}});
          });
    });



module.exports = router;