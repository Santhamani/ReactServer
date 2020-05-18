var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var cors= require("cors")
 
var index = require('./routes/index');
var users = require('./routes/users');
 
var app = express();
 
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views','views');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));
 
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  // database: "local"
});
 
db.connect();
// db.connect(function(err) {
  // if(err) throw err;
  console.log("connected")
  db.query("CREATE DATABASE IF NOT EXISTS blueappletechno", function(err,results){
    if(err) throw err;
    console.log("Blueappletechno DB Created")
  });
// })
 
// db.connect(function(err){
// if(err) throw err;
db.query("USE blueappletechno",(err,results) => {
  if(err) throw err;
  console.log("Using Blue Apple Techno")
});
// })
 
 
var sql = "CREATE TABLE IF NOT EXISTS customer (id VARCHAR(255) primary key UNIQUE, name VARCHAR(255), address VARCHAR(255))";
var continent_sql = "CREATE TABLE IF NOT EXISTS continent (continent_id int(11) NOT NULL primary key UNIQUE AUTO_INCREMENT, continent_name VARCHAR(255) UNIQUE)";
 
var country_sql = "CREATE TABLE IF NOT EXISTS country (country_id int(11) primary key UNIQUE AUTO_INCREMENT, continent_id VARCHAR(255), country_name VARCHAR(255) UNIQUE)";
 
var state_sql = "CREATE TABLE IF NOT EXISTS state (state_id int(11) primary key UNIQUE AUTO_INCREMENT, country_id VARCHAR(255), state_name VARCHAR(255) UNIQUE)";
 
var district_sql = "CREATE TABLE IF NOT EXISTS district (district_id int(11) primary key UNIQUE AUTO_INCREMENT, state_id VARCHAR(255), district_name VARCHAR(255) UNIQUE)";
 
// db.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
// });
 
// db.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  db.query(continent_sql, function (err, result) {
    if (err) throw err;
    console.log("Continent Table created");
  });
// });
 
// db.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  db.query(country_sql, function (err, result) {
    if (err) throw err;
    console.log("Country Table created");
  });
// });
 
// db.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  db.query(state_sql, function (err, result) {
    if (err) throw err;
    console.log("State Table created");
  });
// });
 
// db.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  db.query(district_sql, function (err, result) {
    if (err) throw err;
    console.log("Disrtict Table created");
  });
// });
// var db = require('./modules/database');
 
app.get('/names', (req,res,next) => {
  db.query("SELECT * FROM customer", function (err, result, fields) {
    if (err) {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
    });
})
 
app.get('/continents', (req,res,next) => {
  db.query("SELECT * FROM continent", function (err, result, fields) {
    if (err) {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
    });
})
 
app.get('/countries', (req,res,next) => {
  db.query("SELECT * FROM country", function (err, result, fields) {
    if (err) {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
    });
})
 
app.get('/states', (req,res,next) => {
  db.query("SELECT * FROM state", function (err, result, fields) {
    if (err) {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
    });
})
 
app.get('/districts', (req,res,next) => {
  db.query("SELECT * FROM district", function (err, result, fields) {
    if (err) {
      return res.send(err);
    }
    else{
      return res.json({
        data:result
      })
    }
    });
})
 
app.post('/names/add', (req,res,next) => {
  console.log(req.body);
  db.query('INSERT INTO customer(id, name, address) VALUES ("'+req.body.id+'","'+req.body.name +'","'+req.body.address+'")', function(err, data){
    if(err){
      res.json({success: false});
    }else{
      res.json({success: true});
    }
  });
  // const INSERT_CUSTOMER_QUERY = `INSERT INTO 'customer' (id, name, address) values(${id}, '${name}', '${address}')`;
  // res.send("add names...");
  // db.query(INSERT_CUSTOMER_QUERY,(err,result) => {
  //   if(err){
  //      return res.send(err);
  //   } else {
  //     res.send('added successfully....')
  //   }
  // })
})
 
// Insert continents if it is not exists
app.post('/continents/add', (req,res,next) => {
  console.log(req.body);
  db.query('select continent_id from continent where continent_name = "'+req.body.continent_name+'"', function(err,data){
    console.log(data);
    if(data.length !== 0){ 
      console.log("Already Exists" , data);
      res.json({Success:false, message:"Continent Already Exists"})
    } else {
      console.log("Not Exixts");
      db.query('INSERT INTO continent (continent_name) VALUES("'+req.body.continent_name+'")', function(err,data){  
            if(err){
                res.json({success: false});
              }else{
                res.json({success: true});
              }
            });
        }
  })
})
 
app.post('/countries/add', (req,res,next) => {
  console.log(req.body);
  // const {continent_name} = req.query
  db.query('select country_id from country where country_name = "'+req.body.country_name+'"', function(err,data){
    console.log(data);
    if(data.length !== 0){ 
      console.log("Already Exists" , data);
      res.json({Success:false, message:"Country Already Exists"})
    } else {
      console.log("Not Exixts");
      db.query('INSERT INTO country (continent_id,country_name) VALUES("'+req.body.continent_id+'","'+req.body.country_name+'")', function(err,data){  
            if(err){
                res.json({success: false});
              }else{
                res.json({success: true});
              }
            });
        }
  })
  // const INSERT_CUSTOMER_QUERY = `INSERT INTO 'continent' (continent_name) values('${continent_name}')`;
  // res.send("add names...");
  // db.query(INSERT_CUSTOMER_QUERY,(err,result) => {
  //   if(err){
  //      return res.send(err);
  //   } else {
  //     res.send('added successfully....')
  //   }
  // })
})
 
app.post('/states/add', (req,res,next) => {
  console.log(req.body);
  // const {continent_name} = req.query
  db.query('select state_id from state where state_name = "'+req.body.state_name+'"', function(err,data){
    console.log(data);
    if(data.length !== 0){ 
      console.log("Already Exists" , data);
      res.json({Success:false, message:"State Already Exists"})
    } else {
      console.log("Not Exixts");
      db.query('INSERT INTO state (country_id,state_name) VALUES("'+req.body.country_id+'","'+req.body.state_name+'")', function(err,data){  
            if(err){
                res.json({success: false});
              }else{
                res.json({success: true});
              }
            });
        }
  })
  // const INSERT_CUSTOMER_QUERY = `INSERT INTO 'continent' (continent_name) values('${continent_name}')`;
  // res.send("add names...");
  // db.query(INSERT_CUSTOMER_QUERY,(err,result) => {
  //   if(err){
  //      return res.send(err);
  //   } else {
  //     res.send('added successfully....')
  //   }
  // })
})
 
app.post('/districts/add', (req,res,next) => {
  console.log(req.body);
  // const {continent_name} = req.query
  db.query('select district_id from district where district_name = "'+req.body.district_name+'"', function(err,data){
    console.log(data);
    if(data.length !== 0){ 
      console.log("Already Exists" , data);
      res.json({Success:false, message:"District Already Exists"})
    } else {
      console.log("Not Exixts");
      db.query('INSERT INTO district (state_id,district_name) VALUES("'+req.body.state_id+'","'+req.body.district_name+'")', function(err,data){  
            if(err){
                res.json({success: false});
              }else{
                res.json({success: true});
              }
            });
        }
  })
  // const INSERT_CUSTOMER_QUERY = `INSERT INTO 'continent' (continent_name) values('${continent_name}')`;
  // res.send("add names...");
  // db.query(INSERT_CUSTOMER_QUERY,(err,result) => {
  //   if(err){
  //      return res.send(err);
  //   } else {
  //     res.send('added successfully....')
  //   }
  // })
})
 
app.use('/', index);
app.use('/users', users);
// app.use('/names', names)
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(8080);

