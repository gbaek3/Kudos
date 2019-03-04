const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/kudosdb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


require('./routes/api-routes')(app);


app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});