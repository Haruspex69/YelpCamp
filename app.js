var methodOverride = require('method-override'),
    LocalStrategy  = require('passport-local'),
    bodyParser     = require('body-parser'),
    Campground     = require('./models/campground'),
    passport       = require('passport'),
    Comment        = require('./models/comment'),
    mongoose       = require('mongoose'),
    express        = require('express'),
    seedDB         = require('./seeds'), 
    flash          = require('connect-flash'),//tell the app to use flash 
    http           = require('http'),
    User           = require('./models/user'),
    app            = express();   

//requering routes
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes      = require('./routes/index');

// APP SETUP
mongoose.connect('mongodb://localhost:27017/yelp_camp_v15', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Manea Catalin is the best DEV',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//PROVIDE DATA TO EVERY SINGLE TEMPLATE
app.use(function(req, res, next){
   res.locals.currentUser = req.user; 
   res.locals.error       = req.flash('error');
   res.locals.success     = req.flash('success');
   next();
});

app.locals.moment = require('moment');

//using the routered routes
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

setInterval(function(){
  http.get('https://evening-fortress-97979.herokuapp.com/'); 
}, 300000);

//============================
//LISTENER
//============================

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started!');    
});

