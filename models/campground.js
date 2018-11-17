var mongoose = require('mongoose');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Comment'
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    price: String
});

module.exports = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//   name: 'Granite Hill',
//   image: 'https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });