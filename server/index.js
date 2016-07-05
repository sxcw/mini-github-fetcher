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
  // TODO
  console.log('req.body~~~~~~~~~~' , req.body)
  //console.log('res~~~~~~~~~~',res)
  req.body.forEach(function(repo){
  	knex('repos').insert({
  		name: repo.name,
  		username: repo.username,
  		stargazers: repo.stargazers
  	})
  	.then(console.log('added to database!'))
  })

});


app.get('/repos', function (req, res) {
  // TODO
  // $.ajax({
  //     url: "https://api.github.com/repos/VonC/gitolite/git/refs/tags",
  //     dataType: "json",
  //     success: function (returndata)
  //     {
  //         $("#result").html(returndata[0]["object"]["sha"]);
  //         alert('Load was performed.');
  //     }  
  // });
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
