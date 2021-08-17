express = require('express');
path = require('path');
cookieParser = require('cookie-parser');
logger = require('morgan');
mongoose = require("mongoose");
cors = require('cors');
fetch = require('node-fetch');
_ = require("lodash");
cron = require('node-cron');
nodemailer = require('nodemailer');
crypto = require('crypto');
app = express();


PRODUCTION=false;  
WEB=true; 



PORT = process.env.PORT || 4000;



http = require('http');
httpServer = http.createServer(app);
io = require('socket.io')(httpServer, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }

});

// Routers
router = express.Router();
razorRouter = require('./routes/razor');

app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'RAZOR', 'build')));
app.use(express.json());


app.use((req, res, next) => {
  if (req.url.includes("admin") || 
      req.url.includes("signIn") ||
      req.url.includes("Logout") ||
      req.url.includes("aplmaster")
    ){
    //req.url = "/";
    //res.redirect('/');
    console.log("Path is ", req.url);
    res.sendFile(path.resolve(__dirname, 'RAZOR', 'build', 'index.html'));
  }
  else {
    next();
  }
});

//app.use('/', indexRouter);
app.use('/razor', razorRouter);

// ---- start of globals



nextMatchFetchTime = new Date();
router = express.Router();



// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
  // close mongoose connection
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
  });
  process.exit(0);
});

// schedule task



// start app to listen on specified port
httpServer.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});


// global functions


// module.exports = app;

