var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use( bodyParser.json() );
app.use( express.static('./client'));

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});


app.post('/repos/import', function (req, res) {
  req.body.forEach(function(repo){
  	knex('repos').insert({
  		id: repo.id,
  		name: repo.name,
  		username: repo.username,
  		stargazers: repo.stargazers
  	})
  	.then(console.log('added to database!'))
  })
});


app.get('/repos', function (req, res) {
  knex('repos').select().orderBy('stargazers','desc').limit(25)
  .then((rows)=> {
  	res.send(rows)});
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
