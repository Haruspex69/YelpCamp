var middleware = require('../middleware'),
    Campground = require('../models/campground'),
    express    = require('express'),
    router     = express.Router();
    
//index route
router.get('/', function(req, res){
    //making the search work
    var noMatch = '';
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi'); 
        Campground.find({name: regex}, function(err, foundCamp){
            if(err){
                console.log(err);
            } else {
                if(foundCamp.length < 1){
                    noMatch = 'No campgrounds match that query, please try again!';
                }
                res.render('campgrounds/index', {campgrounds: foundCamp, noMatch: noMatch});
            }
        });
    } else {
        //get all campgrounds from DB
        Campground.find({}, function(err, campgrounds){
           if(err){
               console.log(err);
           } else {
               res.render('campgrounds/index', {campgrounds: campgrounds, currentUser: req.user, noMatch: noMatch});
           }
        });
    }
});

//new route
router.get('/new',middleware.isLoggedIn, function(req, res){
   res.render('campgrounds/new'); 
});

// post route
router.post('/',middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, price: price, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
    
});

//show route
router.get('/:id', function(req, res){//this part adds comments to the campground object
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: foundCampground});     
        }
    });
});

//edit
router.get('/:id/edit',middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render('campgrounds/edit', {campground: foundCamp});    
    });
});

//update
router.put('/:id',middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });   
});

//delete
router.delete('/:id',middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });    
});

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;