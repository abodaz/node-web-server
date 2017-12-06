var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var md5 = require('md5');
const addEmp = require('./routes/addEmp');

// var mysql = require('mysql');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

const port = process.env.PORT || 8888;

var app = express();

//connectToDb();
var config = 
{
  userName: 'mahmoud', // update me
  password: '748254', // update me
  server: 'localhost', // update me
  options: 
     {
         port : 49692,
         database: 'Gym' //update me
         , encrypt: true
     }
};
var connection = new Connection(config);


app.use(require('body-parser')());
app.use(express.static(__dirname+'/views'));
hbs.registerPartials(__dirname + '/html/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `time: ${now} ${req.method} ${req.url}`;

    console.log('Hi Iam jayyab :)');
    console.log('sever.log'+log +'\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render('break');
//    // next();
// });

hbs.registerHelper('year', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home', {
        pagename: 'home'
    });    
});

app.get('/about', (req, res) => {
    res.render('about', {
        pagename: 'about'
    });
});

app.get('/project',(req,res)=>{
    res.render('project',{
        pagename: 'projcet'
    });
});

app.get('/login',(req,res)=>{
    res.render('login',{
        pagename: 'login'
    });
});

app.get('/signup',(req,res)=>{
    res.render('signup',{
        pagename: 'sign up'
    });
});

app.post('/signup',function(req,res){
    console.log('Info Taken');
    //console.log('Form (form querystring): ' + req.query.);
    var name = req.body.name;    
    var pass = req.body.password;
    console.log('name : ' + req.body.name);
    console.log('password : ' + req.body.password);
    var passEncr = md5(pass);

    console.log('Pass after md5 --> ' + passEncr);
    res.end('Thank you');
    
    addEmp(name,passEncr,connection);  
    //res.redirect(303,'File');  
});

app.post('/login',function(req,res){
    console.log('You have entered info to log in -----');
    var name = req.body.username;
    var pass = req.body.password;

    var passEncr = md5(pass);
    console.log('Your name is --> '+name + ', and the password is --> '+pass);
    console.log('Password after encr is --> ' + passEncr);
    request = new Request(
        "SELECT * FROM Users WHERE User_Name ='"+name+"' AND User_password ='"+passEncr+"';",
           function(err, rowCount, rows) 
              {
                  if(err) console.error(err);
                  console.log(rowCount + ' row(s) selected');
              }
          );    
     request.on('row', function(columns) {
            columns.forEach(function(column) {
                console.log("%s\t%s", column.metadata.colName, column.value);
             });
                 });         
     connection.execSql(request);
    res.end('Thank you');
})


app.listen(port,()=>{
    console.log(`server port is ${port}`)
});



 

