const mongoose = require("mongoose");
const Campground = require("../models/campground");
const Review = require("../models/review");
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
  await Review.deleteMany({});
  for (let i = 0; i < 300; i++) {
    let randomCityNumber = Math.floor(Math.random() * cities.length);
    let randomDescriptorNumber = Math.floor(Math.random() * descriptors.length);
    let randomPlacesNumber = Math.floor(Math.random() * places.length);
    let price = Math.floor(Math.random() * 30 + 20);
    let campgroundSeedling = new Campground({
      author: "68fb5ddcd5350a45acd61cc0",
      title: `${descriptors[randomDescriptorNumber]} ${places[randomPlacesNumber]}`,
      location: `${cities[randomCityNumber].city}, ${cities[randomCityNumber].state}`,
      images: [
        {
          url: `https://picsum.photos/400?random=${Math.random()}`,
          filename: "Random Picsum Image",
        },
        {
          url: `https://picsum.photos/400?random=${Math.random()}`,
          filename: "Random Picsum Image",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[randomCityNumber].longitude,
          cities[randomCityNumber].latitude,
        ],
      },
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil in ipsum natus nisi, sequi nostrum voluptatibus delectus aut. Delectus iste totam voluptatum exercitationem ducimus eaque iure natus animi beatae voluptas corrupti possimus minus enim nisi earum hic est, atque temporibus nostrum, rerum nesciunt cumque, omnis repellat. Laboriosam, consectetur! Odio, quas!",
      price,
    });
    await campgroundSeedling.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
