const express = require( 'express' );
const body_parser = require( 'body-parser' );
const info = require( './info.json' );
const participantList = require( './participants.json' );

const fs = require('fs');

const app = express();
const port = process.env.PORT || 8082;

app.use( body_parser.json() );
app.use( body_parser.urlencoded( { extended: true } ) );
app.use( '/imgs', express.static( 'imgs' ) );
app.use( '/styles', express.static( 'styles' ) );
app.use( '/views', express.static( 'views' ) );
app.use( '/fonts', express.static( 'fonts' ) );
app.use( '/files', express.static( 'files' ) );
app.set( 'view engine', 'pug' );

app.post( '/', ( req, res ) => {
  let response = req.body;
  console.log( response );

  participantList[response.section][+response.problem -1]++;
  res.send( "ok" );
} );

app.get( '/', ( req, res ) => {
  res.render( 'main.pug', { info: info, responses: participantList } );
} );

app.listen( port, () => console.log( `Example app listening on port ${port}` ) );


setInterval(
    () => {
        fs.writeFile("./participants.json", JSON.stringify(participantList, null, 2), function (err) {
            if (err) return console.log(err);
            console.log('saved current progress');
        });
    }, 30000
);