'use strict'

const express = require('express');
const router = express.Router();

var User = require('../models/users');

router.get('/', function (req, res, next) {
    if (req.session && req.session.login){
        User.find({}, function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.render('index', { data: data });
          }
        })
      }else{
        res.render('login');
      }
});



module.exports = router;