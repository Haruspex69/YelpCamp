var mongoose   = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comment');
    
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fcbebfe204ad7e04d558d7e0cbc0d2eb&auto=format&fit=crop&w=1350&q=80",
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
    },
    {
        name: "Desert Messa",
        image: "https://images.unsplash.com/photo-1537470040192-de49710d96fd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a4527879f8bf23687b00eaa97764afd&auto=format&fit=crop&w=1350&q=80",
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=053f91dd9aee1cc7bc5cafca28cb625c&auto=format&fit=crop&w=1350&q=80",
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
    }
];

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log('All campgrounds removed!');  
        
        data.forEach(function(campground){
        Campground.create(campground, function(err, createdCamp){
            if(err){
                console.log(err);
            } else {
                console.log('added a campground!');
                
                //create a comment
                Comment.create({text: 'This place is greate but i wish there was internet',
                                author: 'Homer'        
                }, function(err, created){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('comment created');
                        createdCamp.comments.push(created);
                        createdCamp.save();
                    }
                });
            }
        });        
        });
    });
}

module.exports = seedDB;