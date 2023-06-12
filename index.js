// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get('/api', function(req, res){
    const current = new Date();
    return res.json(
      {
      unix: current.getTime(), 
      utc: current.toUTCString()
           });
  
})
app.get('/api/:date', function(req, res){
  var dateString = req.params.date;
  var date;
  
  if(/^\d+$/.test(dateString)){  
    // to check dateString is int value or not
    date = new Date(parseInt(dateString));
  }
    
  else{
    date = new Date(dateString);
  }

  // console.log(date);

  if(date.toString() === 'Invalid Date'){
    res.json({error: 'Invalid Date'});
  }
  else{
  res.json({unix: date.getTime(), 
            utc: date.toUTCString()
           });
  }
  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
