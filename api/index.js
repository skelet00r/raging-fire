
var express = require('express'),
    bodyParser = require('body-parser'),
    responseTime = require('response-time'),
    errorHandler = require('errorhandler'),
    favicon = require('serve-favicon'),
    app = express();

app.use(responseTime());
app.disable('x-powered-by');
app.use(favicon(__dirname + '/assets/bf-favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//preflight stuff
app.use('*', require('./middleware/routes').pre);

//Actual api endpoints
app.use('/', require('./endpoint/routes'));

//Error endpoints such as 404
app.use('*', require('./middleware/routes').post);

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

//Burning down the house!
var server = app.listen(3000, 'localhost', function () {
  console.log('Fire is raging on port http://' + server.address().address + ':' + server.address().port + ' in ' + app.get('env') + ' mode');
});