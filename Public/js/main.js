const preloader   = document.querySelector( '.preloader' );
const bgNumbers   = document.querySelector( '.e404-bg-numbers' );
const silhouettes = new Image( );

function loadingComplete ( ) {
  preloader.classList.remove( '.preloader' );
  preloader.classList.add( 'loaded' );
  bgNumbers.classList.add( 'animate' );
}

function preload ( ) {
  silhouettes.onload  = loadingComplete;
  silhouettes.src     = '/img/404-silhouettes.svg';
}

window.onload = ( ) => {
  preload( );
};