const express   = require( 'express' );
const mongodb   = require( 'mongodb' );
const mongoose  = require( 'mongoose' );
const CORS      = require( 'cors' );
const app       = express( );

// Sets PORT to the enviroment PORT number or 3000.
app.set( 'PORT', process.env.PORT || 3000 );
// Sets Pug as the templating engine.
app.set( 'view engine', 'pug' );
// Defines 'public/' directory for serving static files (css, js, images, etc).
app.use( express.static( `${__dirname}/../public` ) );

// Sets up CORS middleware for freeCodeCamp testing.
const corsOptions = {
  origin: 'http://learn.freecodecamp.org',  
  optionsSuccessStatus: 200
}
app.use( CORS( corsOptions ) );

// When [domain]/ is requested, renders the view views/index.pug.
app.get( '/', ( req,res ) => {              
  res.render( 'index' );
} );

// When [domain]/api/ is requested, renders the view views/index.pug with the 'api' option.
app.get( '/api/', ( req,res ) => {
  res.render( 'index', { api: true } );
} );


// Renders views/404.pug page in case no route matched.
app.use( ( req,res,next ) => {
  res.status( 404 ).render( '404' );
} );

// Defines the port to be listening on for requests.
app.listen(
  app.get( 'PORT' ), ( ) => console.log( `Listening on port ${app.get( 'PORT' )}` )
);