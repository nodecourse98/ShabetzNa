var server = require('express')();
var config = require('./config');
var mongoose = require('mongoose');
var apiRouter = require('./router');
var bodyParser = require('body-parser');
var cors = require('cors');

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


apiRouter(server);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.dbHost + '/' + config.dbName, {useMongoClient: true});

server.listen(config.port, function() {
    console.log(`Server running on port ${config.port}`)
});
//