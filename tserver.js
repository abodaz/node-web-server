var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var md5 = require('md5');
const addEmp = require('./routes/addEmp');

var mysql = require('mysql');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

const port = process.env.PORT || 8888;

var app = express();
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/adminViews'));


//connectToDb();
var config = 
{
  user:'root',
  password: 'hf4pe@l2msh',
  host: 'localhost', // update me
  database:'gym',
  port:3306
};
var connection = mysql.createConnection(config);
connection.connect(function(err){
    if(err) console.error(err);
    else console.log('Connected!');
});
/*connection.query("INSERT INTO Users(user_name,user_password) VALUES('aboodaz','"+md5(2143906)+"');",function(err){
    if(err) console.error(err);
    else console.log('Row done');
});*/
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
/*app.get('/admin',(req,res)=>{
    res.render('admin',{
        pagename: 'Admin Panel'
    });
});

app.get('/seeusers',(req,res)=>{
    res.render('seeusers',{
        pagename: 'See Members'
    });
});

app.get('/registeruser',(req,res)=>{
    res.render('registeruser',{
        pagename: 'Add Members'
    });
});

app.get('/edadmin',(req,res)=>{
    res.render('edadmin',{
        pagename: 'Admin Panel'
    });
});*/
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
    connection.query("SELECT user_id from users where user_name = '"+name+"' and user_password = '"+passEncr+"';",
        function(err,result){            
            if(err) {
                console.error(err);
                res.end('Error Info');
            }
            else {
                console.log(result); // test the lenght .
                if(result.length == 0){
                    console.log('Error Info');
                    res.end('Error Info');
                } 
                else {
                    var id = result[0].user_id;
                    console.log(result[0].user_id);
                    if(id == 1){
                        res.render('admin');
                        app.get('/admin',(req,res)=>{
                            res.render('admin',{
                                pagename: 'Admin Panel'
                            });
                        });
                        
                        app.get('/seeusers',(req,res)=>{
                            res.render('seeusers',{
                                pagename: 'See Members'
                            });
                        });
                        
                        app.get('/registeruser',(req,res)=>{
                            res.render('registeruser',{
                                pagename: 'Add Members'
                            });
                        });
                        
                        app.get('/edadmin',(req,res)=>{
                            res.render('edadmin',{
                                pagename: 'Admin Panel'
                            });
                        });
                    }
                   // res.end('Thank you');
                }
            }
        });
    //res.end('Thank you');
})


app.listen(port,()=>{
    console.log(`server port is ${port}`)
});



 

