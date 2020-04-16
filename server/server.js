require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('./config/express.js');

const port = process.env.PORT || 5000;
const app = express.init();

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });


  app.listen(port, () => console.log(`Server now running on port ${port}!`));