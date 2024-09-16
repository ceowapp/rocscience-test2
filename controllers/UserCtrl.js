const User = require('../models/User');

module.exports = {
    create: async function(req, res) {
        try {
            const newUserDocument = new User(req.body);
            const result = await newUserDocument.save();
            res.status(201).send(result); // Send a 201 Created status
        } catch (err) {
            res.status(500).send(err);
        }
    },

    read: async function(req, res) {
        try {
            const result = await User.find(req.query).exec();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    update: async function(req, res) {
        try {
            const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!result) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    delete: async function(req, res) {
        try {
            const result = await User.findByIdAndRemove(req.params.id);
            if (!result) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
};