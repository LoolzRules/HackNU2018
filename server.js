const express = require( 'express' );
const body_parser = require( 'body-parser' );
const info = require( './info.json' );
const app = express();

const responses = {};
for (let section in info.content_sections.sections) {
  responses[section.name] = {};
  for (let problem in section.problems) {
    responses[section.name][problem.name] = 0;
  }
}

app.use( body_parser.json() );
app.use( body_parser.urlencoded( { extended: true } ) );
app.use( '/imgs', express.static( 'imgs' ) );
app.use( '/styles', express.static( 'styles' ) );
app.use( '/views', express.static( 'views' ) );
app.use( '/fonts', express.static( 'fonts' ) );
app.set( 'view engine', 'pug' );

app.post( '/', ( req, res ) => {
  let response = req.body;
  responses[response.section][response.problem]++;

  res.send( "ok" );
} );

app.get( '/', ( req, res ) => {
  res.render( 'main.pug', info, { responses: responses } );
} );

app.listen( 8082, () => console.log( 'Example app listening on port 8082!' ) );
