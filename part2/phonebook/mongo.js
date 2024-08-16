import mongoose from "mongoose";

if (process.argv.length < 5 && !process.argv[2]) {
  console.log("Give password, name and number as arguments, respectively");
  process.exit();
}

const password = process.argv[2];
const userName = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://fullstackopen:${password}@phonebook.v5bmgu3.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSOCluster`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);
const personObject = new Person({
  name: userName,
  phoneNumber: phoneNumber,
});

if (process.argv.length === 3) {
  console.log("Phonebook:");
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name, person.phoneNumber);
    });
    mongoose.connection.close();
  });
} else {
  personObject.save().then((result) => {
    console.log("Added ", userName, " ", phoneNumber, " to phonebook");
    mongoose.connection.close();
  });
}
