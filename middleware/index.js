var Campground = require('../models/campground'),
    Comment    = require('../models/comment');
  

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                req.flash('error', 'Campground not found!');
                res.redirect('back');
            } else {
                //does the user own the campground?
                if(foundCamp.author.id.equals(req.user._id)){
                    next();    
                } else {
                    req.flash('error', 'You do not have permision to do that!');
                    res.redirect('back');
                }
            }
        });     
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('back');
    }    
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.com_id, function(err, foundComm){
            if(err){
                res.redirect('back');
            } else {
                //does the user own the comment?
                if(foundComm.author.id.equals(req.user._id)){
                    next();    
                } else {
                    req.flash('You do not have permission to do that!');
                    res.redirect('back');
                }
            }
        });     
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('back');
    }    
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');    
};

module.exports = middlewareObj;