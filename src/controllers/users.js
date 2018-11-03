'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Validations = require('../validators/validations');
const repository = require('../repositores/users');
const md5 = require('md5');

exports.post = async (req, res, next) => {
    let val = new Validations();
    val.isRequire(req.body.name, 'O campo nome deve ser preenchido');
    val.isEmail(req.body.email, 'Email inválido');
    val.isRequire(req.body.password, 'O campo senha deve ser preenchido');

    //Condição onde verifica se os dados são inválidos
    if (!val.isValid()) {
        res.status(400).send(val.errors()).end();
        return;
    }

    await repository.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
    })
    try {
        res.status(201).send({
            message: "Usuário cadastrado com sucesso!"
        });
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};
exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
