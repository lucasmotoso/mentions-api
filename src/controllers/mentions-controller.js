const mongoose = require('mongoose');
const Mentions = mongoose.model('Mentions');
const { validationResult } = require('express-validator');
const repository = require('../repositories/mentions-repository');

// list

exports.listMentions = async (req, res) => {
    try {
      const data = await Mentions.find({}, 'friend mention');
      res.status(200).send(data);
    } catch (e) {
      res.status(500).send({message: 'Falha ao carregar as menções!'});
    }
  };


// create
exports.createMention = async (req, res) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).send({message: errors})
    }

    try {
        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        });
        return res.status(201).send({message: 'Menção cadastrada com sucesso!'});
    } catch (e) {
        return res.status(500).send({message: 'Falha ao cadastrar a menção.'});
    }
};
//  update

exports.updateMention = async (req, res) => {
    try {
        await repository.updateMention(req.params.validationResult, req.body);
        res.status(200).send({
            message: 'Menção atualizada com sucesso!'
        });
    } catch (e) {
        res.status(500).send({message: 'Falha ao atualizar a menção.'});
    }
};

exports.updateMention = async (req, res) => {
    const {errors} = validationResult(req);
    if(errors.length > 0) {
        return res.status(400).send({message: errors})
    }
    try {
        await repository.updateMention(req.params.validationResult, req.body);
        return res.status(200).send({
            message: 'Menção atualizada com sucesso!'
        });
    } catch (e) {
        return res.status(500).send({message: 'Falha ao atualizar a menção.'})
    } 
};

// delete
exports.deleteMention = async (req, res) => {
    try {
      await repository.deleteMention(req.params.id);
      res.status(200).send({
        message: 'Menção removida com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao remover a menção.'});
    }
  };