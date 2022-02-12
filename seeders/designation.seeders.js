const mongoose = require("mongoose");
const Designation = require('../models/Designation');
const dotenv = require('dotenv').config();

const designationData = [
  {
    name: "Trainees",
  },
  {
    name: "Plant Head",
  },
  {
    name: "Safety Head",
  },
  {
    name: "Safety Officer",
  },
  {
    name: "Sr. Safety Officer",
  },
  {
    name: "Engineer",
  },
  {
    name: "Sr. Engineer",
  },
  {
    name: "Operator",
  },
  {
    name: "Sr. Operator",
  },
  {
    name: "Manager",
  },
  {
    name: "Sr. Manager",
  },
  {
    name: "Asssitant Manager",
  },
  {
    name: "Deputy Manager",
  },
  {
    name: "General Manager",
  },
  {
    name: "Human Resource Manager",
  },
  {
    name: "Administrator",
  },
  {
    name: "Assistant Administrator",
  },
];

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MONGO CONNECTION OPEN');
})
.catch((error) => {
  console.log(error);
});

const seedDesignation = async () => {
  await Designation.deleteMany({});
  await Designation.insertMany(designationData);
}

seedDesignation().then(() => {
  mongoose.connection.close();
});
