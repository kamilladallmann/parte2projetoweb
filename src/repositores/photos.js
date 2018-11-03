'use strict'

const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');

exports.get = async() => {
    const res = await Photo.find({}, 'title slug');
    return res;
}

exports.getBySlug = async(slug) => {
   const res = await Photo.findOne({ slug: slug }, 'title slug tags');
   return res;
}

exports.getByTag = async(tag) => {
    const res = await Photo.findOne({ tags: tag }, 'title slug tags')
    return res;
}

exports.create = async(data) => {
    var photo = new Photo(data);
    await photo.save()
}

exports.update = async(id, data) => {
    await Photo.findByIdAndUpdate(id, {
        $set: { //seta o que veio da requisão e que vai ser alterado
            title: data.title,
            slug: data.slug,
        }
    });
}

exports.delete = async(id) => {
    await Photo.findByIdAndRemove(id);
}