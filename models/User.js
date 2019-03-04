const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  kudos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Kudo"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
