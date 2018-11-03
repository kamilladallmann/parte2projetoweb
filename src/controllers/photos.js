'use strict'

const multer = require('multer');
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo');
const Validations = require('../validators/validations');
const repository = require('../repositores/photos');

//Lista imagem
exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
};

//Salva Imagem no banco

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, '../uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + ' - ' + Date.now() + Path2D.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(/*res.end('Only images are allowed')*/ null, false)
        }
        callback(null, true)
    }
});



exports.post = async (req, res, next) => {
    let val = new Validations();
    val.isRequire(req.body.title, 'O campo Titulo deve ser preenchido');
    val.isRequire(req.body.slug, 'O campo Slug deve ser preenchido');
    val.isRequire(req.body.tags, 'O campo Tag deve ser preenchido com pelo menos uma Tag');

    //Condição onde verifica se os dados são inválidos
    if (!val.isValid()) {
        res.status(400).send(val.errors()).end();
        return;
    }

    if (!req.body && !req.files) {
        res.json({ sucess: false });
    }else{
        var c;
        Photo.findOne({}, function(err, data){
            if(data){
                c = data.unique_id + 1;
            }else{
                c = 1;
            }
        })
    }

    await repository.create(req.body)
    try {
        res.status(201).send({
            message: "Imagem salva com sucesso!"
        });
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

};

//Atualiza dados da imagem
exports.put = async (req, res, next) => {

    try {
        await repository.update(req.params.id, req.body)
        res.status(201).send({
            message: "Imagem atualizada com sucesso!"
        });
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

//Remove Imagem
exports.delete = async (req, res, next) => {
    try {
        await repository.update()

        res.status(201).send({
            message: "Imagem removida com sucesso!"
        });
    } catch (err) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

};
