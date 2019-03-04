const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var KudoSchema = new Schema({
    toUser: String,
    fromUser: String,
    title: String,
    body: String
});

const Kudo = mongoose.model("Kudo", KudoSchema);

module.exports = Kudo;