const DNS       = require( 'dns' );
const LinkModel = require( '../Models/LinkModel' );

let newShortRef = Math.random( ).toString( 36 ).substring( 2,10 );

exports.postURL = ( req,res ) => {
  const URL           = req.body.url;
  const URLRegEx      = /(https?:\/\/)?(www\.)?[\w-@:%._\+~#=]{2,}\.[a-z]{2,6}\b([\w-@:%._\+.~#?&/=]*)/i;
  const validURL      = URL.match( URLRegEx );
  const validProtocol = URL.match( /^https?:\/\// );
  const errorMSG      = {
    invalidURL  : { "error": "invalid URL"       },
    invalidHost : { "error": "invalid hostname"  },
  };

  if ( validProtocol && validURL ) {
    const urlWithoutProtocol = URL.replace(/^https?\:\/\//i, "");
    DNS.lookup( urlWithoutProtocol, error => {
      if ( error )  res.json( errorMSG.invalidHost );
      else          checkIfUrlExists( URL,res );
    } );
  } else {
    res.json( errorMSG.invalidURL );
  }
};

const checkIfUrlExists = ( URL,res ) => {
  checkIfShortRefExists( )
  LinkModel.findOne( { link: URL }, ( error,foundURL ) => {
    if ( error )      return console.log( error );

    if ( foundURL )   res.json({"original_url": URL, "short_url": foundURL.short});
    else              saveLink( URL,res );
  } )
}

const saveLink = ( URL,res ) => {
  const newLink = new LinkModel( {
    'link'  : URL,
    'short' : newShortRef
  } );
  newLink.save( error => {
    if ( error ) return console.log( error );
    res.json( { "original_url": URL, "short_url": newShortRef } );
  });
}

const checkIfShortRefExists = ( ) => {
  LinkModel.findOne( { short: newShortRef }, ( error,foundRef ) => {
    if ( error )      return console.log( error );
    if ( foundRef ) {
      newShortRef = Math.random( ).toString( 36 ).substring( 2,10 );
      checkIfShortRefExists( );
    }
    return true;
  })
  
}