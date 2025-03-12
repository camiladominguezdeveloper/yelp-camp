const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '67765e0c2a22db272dc04fc6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vero veniam eligendi rem quibusdam maxime ipsa adipisci modi qui iste? Esse, quas. Hic sit, aliquam saepe ab exercitationem esse consequatur.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/dzultoj5g/image/upload/v1736959165/YelpCamp/fgeta6iwffz8bq2gs0c0.jpg',
                filename: 'YelpCamp/o1msh9n7espg6miiu5lp',
                },
                {
                url: 'https://res.cloudinary.com/dzultoj5g/image/upload/v1736959251/YelpCamp/pgjs7rsg7u8wm2dkjare.jpg',
                filename: 'YelpCamp/zpjlqcpwsuwui9tykfor',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});