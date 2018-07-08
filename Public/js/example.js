const outputUrl     = document.getElementById( 'output-url' );
const outputError   = document.getElementById( 'output-error' );
const textInput     = document.getElementById( 'textInput' );
const shortUrlInput = document.getElementById( 'short-url-input' );
const copyBtn       = document.getElementById( 'copy-btn' );
let shown           = false;

document.getElementById( 'textInput' ).addEventListener( 'input', ( event ) => {
  if ( shown ) {
    shown = false;
    outputUrl.classList.remove( 'shown' );
    outputUrl.classList.add( 'hidden' );
    outputError.classList.remove( 'shown' );
    outputError.classList.add( 'hidden' );
    copyBtn.textContent = 'copy';
  }
} );

document.getElementById( 'form' ).addEventListener( 'submit', ( event ) => {
  event.preventDefault( );

  const API_URL  = 'https://cortala.glitch.me/api/shorturl/';
  const URLRegEx = /(https?:\/\/)(www\.)?[\w-@:%._\+~#=]{2,}\.[a-z]{2,6}\b([\w-@:%._\+.~#?&/=]*)/i;
  const URL      = textInput.value;


  const request  = new Request( '/api/shorturl/new', {
    method      : 'POST',
    body        : `url=${URL}`,
    headers     : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  } );

  if ( URL.match( URLRegEx ) ) {
    fetch( request ).then( ( res ) => {
      if ( res.ok ) {
        shown = true;
        res.json().then( ( data ) => {
          shortUrlInput.value = `${API_URL}${data.short_url}`;
          outputUrl.classList.add( 'shown' );
          outputUrl.classList.remove( 'hidden' );
        } );
      } else {
        throw Error( `Request rejected with status ${res.status}` );
      }
    })
    .catch( ( err ) => {
      console.log( 'There has been a problem with your fetch operation: ' + err.message );
    });
  } else {
    outputError.classList.add( 'shown' );
    outputError.classList.remove( 'hidden' );
    shown = true;
  }
});

function copy ( ) {
  shortUrlInput.select();
  document.execCommand( 'copy' );
  copyBtn.textContent = 'copied';
}