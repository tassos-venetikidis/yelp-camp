const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("OH NO! MONGO CONNECTION ERROR");
    console.log(err);
  });

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    let randomCityNumber = Math.floor(Math.random() * cities.length);
    let randomDescriptorNumber = Math.floor(Math.random() * descriptors.length);
    let randomPlacesNumber = Math.floor(Math.random() * places.length);
    let campgroundSeedling = new Campground({
      title: `${descriptors[randomDescriptorNumber]} ${places[randomPlacesNumber]}`,
      location: `${cities[randomCityNumber].city}, ${cities[randomCityNumber].state}`,
    });
    await campgroundSeedling.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
