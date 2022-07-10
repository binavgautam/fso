const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;
console.log("Connecting to", url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{8}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minlength: 8,
    unique: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

module.exports = mongoose.model("Person", personSchema);
