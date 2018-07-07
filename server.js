const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var db

app.set('view engine', 'ejs')

MongoClient.connect('mongodb://BSMHex88:FirstRESTBuild111@ds129811.mlab.com:29811/node_quotes_nosql_first', (err, client) => {
	if (err) return console.log(err)
	db = client.db('node_quotes_nosql_first')
	app.listen(3000, function() {
		console.log('lisening on 3000')
		})
})
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, resultç) => {
		if (err) return console.log(err)
		//renders index.ejs
		res.render('index.ejs', {quotes: result})
	})
})

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
		res.redirect('/')
	})
	console.log(req.body)
})

