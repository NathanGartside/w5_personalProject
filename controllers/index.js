const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

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
    console.log(result)
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

module.exports = {getAll, getSingle, addAccount, updateAccount, deleteAccount};