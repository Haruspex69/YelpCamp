var middleware = require('../middleware'),
    Campground = require('../models/campground'),
    Comment    = require('../models/comment'),
    express    = require('express'),
    router     = express.Router({mergeParams: true}); //you can find the id from the refactored route

//new comment route
router.get('/new',middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: foundCamp});      
        }
    });
});

//post comment
router.post('/',middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);    
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, created){
                if(err){
                    req.flash('error', 'Something went wrong!');
                    console.log(err);
                } else {
                    //add username and id to comment
                    created.author.id = req.user._id;
                    created.author.username = req.user.username;
                    //save comment
                    created.save();
                    campground.comments.push(created);
                    campground.save();
                    req.flash('success', 'Successfully added comment!');
                    res.redirect('/campgrounds/' + req.params.id);
                }  
            });
        }
    }); 
});

//edit comment
router.get('/:com_id/edit',middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.com_id, function(err, foundComm){
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComm});        
        }
    });
});

//update comment 
router.put('/:com_id',middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.com_id, req.body.comment, function(err, updated){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }          
    }); 
});

//delete comment
router.delete('/:com_id',middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.com_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });    
});

module.exports = router;