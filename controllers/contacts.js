const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.tags = ['contacts']
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res, next) => {
  // #swagger.tags = ['contacts']
    const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createcontact = async (req, res) => {
  // #swagger.tags = ['contacts']
    console.log('createcontact req.body =', req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }
    const contact = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      ipaddress: req.body.ipaddress
    };
    try {
      const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
      if (response.acknowledged) {
        // Return created id so clients (like your REST Client requests) can use it
        res.status(201).json({ id: response.insertedId });
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
    } catch (err) {
      res.status(500).json(err.message || 'Error inserting contact');
    }
  };

  const updatecontact = async (req, res) => {
    // #swagger.tags = ['contacts']
    console.log('updatecontact req.body =', req.body, 'params=', req.params);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body is required' });
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      ipaddress: req.body.ipaddress
    };
    try {
      const response = await mongodb.getDb().db().collection('contacts').updateOne({ _id: contactId }, { $set: contact });
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
    } catch (err) {
      res.status(500).json(err.message || 'Error updating contact');
    }
  };

  const deletecontact = async (req, res) => {
    // #swagger.tags = ['contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId }, true);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = {
   getAll, 
   getSingle,
   createcontact,
   updatecontact,
   deletecontact
  };


