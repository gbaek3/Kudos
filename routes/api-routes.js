const User = require('../models/User');
const Kudo = require('../models/Kudo');

module.exports = function (app) {
    app.get('/api/kudos', function (req, res) {
        Kudo.find({})
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });


    app.get('/api/user', function (req, res) {
        User.find({})
            .populate('kudos')
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.post('/api/kudo', function (req, res) {
        const userId = req.body.userId;
        const newEntry = {
            title: req.body.title,
            body: req.body.body,
            toUser: req.body.toUser,
            fromUser: req.body.fromUser
        }

        Kudo.create(newEntry)
            .then(function (KudoData) {
                return User.findOneAndUpdate({ _id: userId }, { $push: { kudos: KudoData._id } }, { new: true });
            })
            .then(function (userData) {
                res.json(userData);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}