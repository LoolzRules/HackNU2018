const express = require( 'express' );
const body_parser = require( 'body-parser' );
const info = require( './info.json' );
const app = express();

const port = process.env.PORT || 8082;

const responses = {};
info.content_sections.sections.forEach( ( section ) => {
  responses[section.name] = {};
  section.problems.forEach( ( problem ) => {
    responses[section.name][problem.name] = 0;
  } );
} );

app.use( body_parser.json() );
app.use( body_parser.urlencoded( { extended: true } ) );
app.use( '/imgs', express.static( 'imgs' ) );
app.use( '/styles', express.static( 'styles' ) );
app.use( '/views', express.static( 'views' ) );
app.use( '/fonts', express.static( 'fonts' ) );
app.set( 'view engine', 'pug' );

app.post( '/', ( req, res ) => {
  let response = req.body;
  console.log( response, responses[response.section][response.problem] );
  responses[response.section][response.problem]++;
  res.send( "ok" );
} );

app.get( '/', ( req, res ) => {
  res.render( 'main.pug', { info: info, responses: responses } );
} );

app.listen( port, () => console.log( `Example app listening on port ${port}` ) );