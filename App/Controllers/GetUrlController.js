const LinkModel = require( '../Models/LinkModel' );

exports.getURL = ( req,res ) => {
  const errorMSG    = { "error": "Sorry. The URL you were looking for was not found." };
  const URL         = req.params.url;

  LinkModel.findOne( { "short": URL }, ( error,shortRef ) => {
    if ( error )    return console.log( error );

    if ( shortRef ) res.redirect( shortRef.link );
    else            res.json( errorMSG );
  } );
}