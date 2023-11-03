const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator');

async function getAll(req, res) {
    // #swagger.description = 'Get all the accounts'
    const result = await mongodb.getDb().db().collection('accountInfo').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); // we just need the first one (the only one)
    });
}

async function getSingle(req, res) {
    // #swagger.description = 'Get one of the accounts'
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('accountInfo').find({_id: id});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]); // we just need the first one (the only one)
    });
}

async function addAccount(req, res) {
    // #swagger.description = 'Add one account'

    const account = {username: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.first_name, birthday: req.body.birthday, last_name: req.body.last_name};
    const result = await mongodb.getDb().db().collection('accountInfo').insertOne(account);
    
    if(result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result || 'Something went wrong')
    }
}

async function updateAccount(req, res) {
    // #swagger.description = 'Update one account'
    const account = {username: req.body.username, password: req.body.password, email: req.body.email, first_name: req.body.first_name, birthday: req.body.birthday, last_name: req.body.last_name};
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('accountInfo').replaceOne({_id:id}, account);

    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result || "Something went wrong")
    }
}

async function deleteAccount(req, res) {
    // #swagger.description = 'Delete one account'
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('accountInfo').deleteOne({_id:id});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
}

async function createNewMessage(req, res) {
    // #swagger.description = 'Create new message'
    const d = new Date()
    const date = `${d.getMonth()+1}/${d.getDate()+1}/${d.getFullYear()}`;
    console.log(date);
    const message = {sender: req.body.sender, receiver: req.body.receiver, sender_email: req.body.sender_email, receiver_email: req.body.receiver_email, subject: req.body.subject, message: req.body.message, date: date};
    const result = await mongodb.getDb().db().collection('messages').insertOne(message);

    if(result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result || 'Something went wrong')
    }
}

async function getMessagesForUsername(req, res) {
    // swagger.description = 'Get all messages for a specific username'

    const receiver = req.params.receiver;
    
    const result = await mongodb.getDb().db().collection('messages').find({receiver:receiver});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); // we just need the first one (the only one)
    });

}

module.exports = {getAll, getSingle, addAccount, updateAccount, deleteAccount, createNewMessage, getMessagesForUsername};