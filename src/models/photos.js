'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const photoSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
    },
    tags: [{
        type: String,
        requires: true,
    }],

    image: {
        type: String,
        required: true,
        trim: true,
    },

    added_date:{
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('Photo', photoSchema);