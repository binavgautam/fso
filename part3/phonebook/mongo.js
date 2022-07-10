const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log(
    "Please provide all the required fields: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

if (process.argv.length > 5) {
  console.log("Too many arguments provided");
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://binav:${password}@cluster0.heqwine.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected");

      const person = new Person({
        name: personName,
        number: personNumber,
      });

      return person.save();
    })
    .then(() => {
      console.log(`Added ${personName} number ${personNumber} to phonebook `);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    Person.find({}).then((result) => {
      console.log("Phonebook:");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
  });
}
