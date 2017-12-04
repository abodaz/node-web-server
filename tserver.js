var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
const port = process.env.PORT || 8888;

var app = express();
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

app.listen(port,()=>{
    console.log(`server port is ${port}`)
});