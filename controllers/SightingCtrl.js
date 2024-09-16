const Sighting = require('../models/Sighting');

module.exports = {
    create: async function (req, res) {
        try {
            const newSighting = new Sighting(req.body);
            const result = await newSighting.save();
            res.status(201).send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    read: async function (req, res) {
        try {
            console.log('req.query: ', req.query);
            const result = await Sighting.find(req.query).populate('user', 'username').exec();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    update: async function (req, res) {
        try {
            const result = await Sighting.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    delete: async function (req, res) {
        try {
            const result = await Sighting.findByIdAndRemove(req.params.id);
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
};
