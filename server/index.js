const express = require("express");
let app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
let fs = require('fs');

let keyD="KC3vRSZb2cmQsC9k"
let keyA='nCWfP5cZNWNHqSPB'
let my_key = keyD

app.use(bodyParser.json({limit: '50mb'}));

//LISTER LES CATEGORIE DES EVENTS
app.get('/allCategorie', async function(req, res) {
    await axios.get('http://api.eventful.com/json/categories/list?app_key=' + my_key)
    .then(resp => {
        // console.log(resp.data,"yoooo");
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        res.send(resp.data);
    });
})

//COMBINAISON DE RECHERCHE D'EVENT AVEC UNE CATEGORIE & LOCALISATION
app.get('/filter', async function(req, res) {
    await axios.get('http://api.eventful.com/json/events/search/?app_key='+ my_key +'&categories=music&location=Paris')
    .then(resp => {
        // console.log(resp.data.events.event,"seeeeearch");
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        res.send(resp.data);
    });
})

//RECUPERER UN EVENT PAR SON ID
app.get('/event/:id_event', async function(req, res) {
     console.log(req.params.id_event)
    await axios.get('http://api.eventful.com/json/events/get?app_key='+ my_key +'&id='+req.params.id_event)
    .then(resp => {
        // console.log(resp.data,'tchiiiiiiiiiiiiiiiiii');
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        res.send(resp.data);
    });
})

app.listen(4242, function (err) {
    if (err) {
		console.log(err);
	} else {
		console.log(`server listening on http://localhost:4242`);
    }
})