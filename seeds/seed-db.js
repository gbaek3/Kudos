const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/kudosdb");

const list = [
    {
        username: "Leonardo"
    },
    {
        username: "Raphael"
    },
    {
        username: "Michaelangelo"
    },
    {
        username: "Donatello"
    },
];

db.User.deleteMany({})
    .then(() => db.User.collection.insertMany(list))
    .then(data => {
        console.log(data.insertedCount + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });