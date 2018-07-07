const mongoose  = require( 'mongoose' );
const Schema    = mongoose.Schema;

const LinkModel = new Schema ( {
  link  : { type: String, required: true },
  short : { type: String, required: true }
} );

module.exports = mongoose.model( 'LinkModel', LinkModel );