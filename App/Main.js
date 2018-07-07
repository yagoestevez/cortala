/////////////////////////////   IMPORTS   /////////////////////////////
const express           = require( 'express' );
const mongoose          = require( 'mongoose' );
const CORS              = require( 'cors' );
const app               = express( );
const postUrlController = require( './Controllers/PostUrlController' );
const getUrlController  = require( './Controllers/GetUrlController'  );

// Helps enabling a .env configuration file.
require( 'dotenv' ).config( );

///////////////////////////// MIDDLEWARES /////////////////////////////
// Sets PORT to the enviroment PORT number or 3000.
app.set( 'PORT', process.env.PORT || 3000 );
// Sets Pug as the templating engine and its root directory.
app.set( 'view engine', 'pug' );
app.set( 'views', `${__dirname}/./Views` );
// Defines 'public/' directory for serving static files (css, js, images, etc).
app.use( express.static( `${__dirname}/../Public` ) );
// Uses the new urlencoded middleware from Express for POST requests.
app.use( express.urlencoded( { extended: true } ) );
// Sets up CORS middleware for freeCodeCamp testing.
const corsOptions = {
  origin: [ 'https://www.freecodecamp.com','http://learn.freecodecamp.org' ],
  optionsSuccessStatus: 200
}
app.use( CORS( corsOptions ) );

/////////////////////////////  DATABASE  /////////////////////////////
// Sets database handler.
mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true } );

/////////////////////////////   ROUTES   /////////////////////////////
app.get( '/', ( req,res ) => {  // Main Index
  res.render( 'Index' );
} );

app.get( '/api/', ( req,res ) => {  // API Index.
  res.render( 'Index', { api: true } );
} );

// Main GET route for the API. Redirects to the URL matching the 'url' param or an JSON error.
app.get(  '/api/shorturl/:url' , getUrlController.getURL  );
app.post( '/api/shorturl/new'  , postUrlController.postURL );

// 404 error: Renders views/404.pug page in case no route matched.
app.use( ( req,res,next ) => {
  res.status( 404 ).render( '404' );
} );

/////////////////////////////    PORT    /////////////////////////////
// Defines the port to be listening on for requests.
app.listen(
  app.get( 'PORT' ), ( ) => console.log( `Listening on port ${app.get( 'PORT' )}` )
);