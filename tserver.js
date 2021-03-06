var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var md5 = require('md5');
const addEmp = require('./routes/addEmp');
const addbranch = require('./routes/addBrnch');
var logEmp = require('./routes/login');
var mysql = require('mysql');
var addmng = require('./routes/addBmng');
var addclerk = require('./routes/addclerk');
var addcleaner = require('./routes/addcleaner');
var addtrainer =require('./routes/addtrainer');
var addmem = require('./routes/addMem');
const port = process.env.PORT || 8888;
var _mngagar_ssn='';
var _id;
var addaddress = require('./routes/addaddress');
var addtool = require('./routes/addtool');
var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/adminViews'));


//connectToDb();
var config = 
{
  user:'root',
  password: '',
  host: 'localhost', // update me
  database:'gym',
  port:3306,
  dateStrings: 'date',
  multipleStatements: true
};
var connection = mysql.createConnection(config);
connection.connect(function (err) {
    if (err) console.error(err);
    else console.log('Connected!');
});
console.log(md5('2143906'));
/*connection.query("INSERT INTO Users(user_name,user_password) VALUES('aboodaz','"+md5(2143906)+"');",function(err){
    if(err) console.error(err);
    else console.log('Row done');
});*/

app.use(require('body-parser')());
app.use(express.static(__dirname + '/views'));
hbs.registerPartials(__dirname + '/html/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `time: ${now} ${req.method} ${req.url}`;

    console.log('Hi Iam jayyab :)');
    console.log('sever.log' + log + '\n');
    next();
});

/*app.use((req,res,next)=>{
    res.render('break');
   // next();
});*/

hbs.registerHelper('year', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home', {
        pagename: 'home'
    });
});

// app.get('/about', (req, res) => {
//     res.render('about', {
//         pagename: 'about'
//     });
// });

// app.get('/project',(req,res)=>{
//     res.render('project',{
//         pagename: 'projcet'
//     });
// });

app.get('/login', (req, res) => {
    res.render('login', {
        pagename: 'login'
    });
});

app.get('/signup', (req, res) => {
    res.render('signup', {
        pagename: 'sign up'
    });
});
//admin
app.get('/admin', (req, res) => {
    res.render('admin', {
        pagename: 'Admin Panel'
    });
});








/*app.get('/seeusers',(req,res)=>{
    res.render('seeusers',{
        pagename: 'See Members'
    });
});*/












// app.get('/seebranches',(req,res)=>{
//     res.render('seebranches',{
//         pagename: 'Our Branches'
//     });
// });

app.get('/addBM', (req, res) => {
    res.render('addBM', {
        pagename: 'Add Branch Manager'
    });
});

// app.get('/edadmin', (req, res) => {
//     res.render('edadmin', {
//         pagename: 'Admin Panel'
//     });
// });
// app.get('/singleBranch', (req, res) => {
//     res.render('singleBranch', {
//         pagename: 'Branch'
//     });
// })
// app.get('/addB', (req, res) => {
//     res.render('addB', {
//         pagename: 'Add Branch'
//     });
// });
// //manager
// app.get('/manager', (req, res) => {
//     res.render('manager', {
//         pagename: 'Manager Page'
//     });
// })
// app.get('/seeusers', (req, res) => {
//     res.render('seeusers', {
//         pagename: 'Our Users'
//     });
// });
// app.get('/addEmp', (req, res) => {
//     res.render('addEmp', {
//         pagename: 'Add Employees'
//     });
// });
// app.get('/edmanager', (req, res) => {
//     res.render('edmanager', {
//         pagename: 'Edit Infomations'
//     });
// });
// //clerk
// app.get('/clerk', (req, res) => {
//     res.render('clerk', {
//         pagename: 'Clerk Page'
//     });
// });
// app.get('/edclerk', (req, res) => {
//     res.render('edclerk', {
//         pagename: 'Clerk Page'
//     });
// });
// app.get('/seeMemb', (req, res) => {
//     res.render('seeMemb', {
//         pagename: 'Our Members'
//     });
// });
// app.get('/addMemb', (req, res) => {
//     res.render('addMemb', {
//         pagename: 'Add Members'
//     });
// });
// app.get('/commitMemb', (req, res) => {
//     res.render('commitMemb', {
//         pagename: 'Commit Members'
//     });
// });

app.get('/clerk',function(req,res){
    res.render('clerk');
});
app.post('/signup', function (req, res) {
    console.log('Info Taken');
    //console.log('Form (form querystring): ' + req.query.);
    var name = req.body.name;
    var pass = req.body.password;
    console.log('name : ' + req.body.name);
    console.log('password : ' + req.body.password);
    var passEncr = md5(pass);

    console.log('Pass after md5 --> ' + passEncr);
    res.end('Thank you');

    addEmp(name, passEncr, connection);
    //res.redirect(303,'File');  
});

app.post('/login', function (req, res) {
    try {
    console.log('You have entered info to log in -----');
    var name = req.body.username;
    var pass = req.body.password;

    var passEncr = md5(pass);
    
    console.log('Your name is --> '+name + ', and the password is --> '+pass);
    console.log('Password after encr is --> ' + passEncr);
    var id ;
    connection.query("SELECT user_id,user_name,user_type from users where user_name = '"+name+"' and user_password = '"+passEncr+"';",
        function(err,result){            
            if(err) {
                console.error(err);
                res.end('Error Info');
            }
            else {
                console.log(result); // test the lenght .
                if (result.length == 0) {
                    console.log('Error Info');
                    res.end('Error Info');
                }
                else {
                    var id = result[0].user_id;
                    _id = id;
                    var admin = {};                   
                    console.log(result[0].user_id);
                    if (id == 1) // for the only Admin
                     {
                        res.render('admin');
                        app.get('/admin', (req, res) => {
                            res.render('admin', {
                                pagename: 'Admin Panel'
                            });
                        });
                        
                        app.get('/seebranches',(req,res)=>{
                            seebranches(res);
                        });

                        app.post('/singleBranch',function(req,res){
                            var branch_num = req.body.select;
                            res.render('singleBranch',{

                            });
                        })
                        app.get('/addBM', (req, res) => {
                            res.render('addBM', {
                                pagename: 'Add Branch Manager'
                            });
                        });
                        
                        app.get('/edadmin',(req,res)=>{  
                            console.log('Enter edadmin');
                            getEmp(res,id,admin);  
                             
                        });
                        app.get('/checkB',function(req,res){
                            seebranch(req,res);
                            
                        })
                        app.post('/edadmin',function(req,res){ // WHEN CLICK COMMIT BUTTON..
                            console.log('HI');
                            var fname = req.body.fname;
                            var lname = req.body.lname;
                            var uname = req.body.user_name;
                            var uemail = req.body.user_email;
                            var errors = [];
                            if(! fname) errors.push('first name missed');
                            if(! lname) errors.push('last name missed');
                            if(! uname) errors.push('user name missed');
                            if(! uemail) errors.push('user email missed');
                            console.log(errors);
                            if(! errors.length){ // ADD update for employee table .................. ya dog
                                connection.query("UPDATE users set user_name = '"+uname+"' WHERE user_id = "+id,
                                function(err,result){
                                    if(err) throw err;
                                    console.log('Update user table');
                                });
                                connection.query("UPDATE employee set first_name ='"+fname+"', last_name ='"+lname+"', email ='"+uemail+"' WHERE user_id ="+id,
                            function(err,result){
                                if(err) throw err;
                                console.log('Update employee table');
                                //getEmp(req,res,id,admin);
                                });
                                var oldpass = req.body.oldpass;
                                var newpass = req.body.newpass;
                                if(oldpass && newpass) {
                                    console.log('You try to change password');
                                    connection.query("SELECT user_password from users where user_id = "+id+";",function(err,result){
                                        if(err) throw err;
                                        var correctpass = result[0].user_password;
                                        var passEnc = md5(oldpass);
                                        console.log(correctpass);
                                        console.log(passEnc);
                                        if(correctpass == passEnc) {
                                            console.log('Yes the password is true');
                                            var newpassword = md5(newpass);
                                            connection.query("UPDATE users set user_password ='"+newpassword+"' WHERE user_id ="+id+";",function(err){
                                                if(err) throw err;
                                                console.log('New password updated');
                                            })
                                        }
                                    })
                                }
                            } else {
                                console.log(errors);
                            }
                            
                            
                            //res.redirect(req.get('referer'));
                            
                            getEmp(res,id,admin);
                            //res.redirect('/edadmin');
                        });
                        //app.get('/singleBranch', (req, res) => {
                      //      seeadminusers(res,req);
                            /*res.render('singleBranch', {
                                pagename: 'Branch'
                            });*/
                    //    });
                        app.post('/checkB',function(req,res){
                            seeadminusers(res,req);
                        });
                        app.get('/addB',(req,res)=>{
                            getmanagers(res);                            
                        });

                        app.get('/addAddress',function(req,res){
                            res.render('addAddress');
                        });
                        app.post('/addAddress',function(req,res){
                            console.log(req.body);
                            var address = {};
                            address.country = req.body.country;
                            address.city = req.body.city;
                            address.postal = req.body.Postal;
                            var errors = [];
                            if(! address.country) errors.push('country name missed!');
                            if(! address.city) errors.push('city name missed!');
                            if(! address.postal) errors.push('postal code missed!');

                            if(! errors.length){
                                addaddress(address,connection);
                                res.end('Ok mashi');
                            } else {
                                console.log(errors);
                                res.end(''+errors);
                            }
                        })
                        app.post('/addB',function(req,res){
                            console.log('You try to add new branch, let us see the result :)');
                            var branch = {};
                            var errors = [];
                            branch.name = req.body.branch_name;
                            branch.number = req.body.branch_number;
                            branch.country = req.body.country;
                            branch.city = req.body.city;
                            branch.street = req.body.street;
                            branch.mng = req.body.select;
                            console.log(req.body);
                            if(! branch.name) errors.push('branch name missed!');
                            if(! branch.number) errors.push('branch number missed!');
                            if(! branch.country) errors.push('country name missed!');
                            if(! branch.city) errors.push('city name missed!');
                            if(! branch.street) errors.push('street name missed!');
                            if(! branch.mng) errors.push('manager missed!');
                            if(! errors.length) {
                                addbranch(branch,connection);
                                res.end('see console for more info');
                            } else {
                                console.log(errors);
                            }
                            
                        });

                        app.post('/addBM',function(req,res){
                            console.log('You try to add new branch manager, let us see the result :)');
                            var manager ={};
                            var user = {};
                            var errors = [];
                            var pass = md5(req.body.user_password);
                            user.username = req.body.user_name;
                            user.password = pass;
                            manager.ssn = req.body.ssn;
                            manager.fname = req.body.first_name;
                            manager.lname = req.body.last_name;
                            manager.email = req.body.user_email;
                            manager.bdate = req.body.Bday;
                            manager.hdate = req.body.Hday;
                            manager.phone = req.body.phone;
                            manager.salary = req.body.salary;
                            var diff = manager.hdate.split('-')[0] - manager.bdate.split('-')[0];
                            if(! manager.ssn) errors.push('ssn error!');
                            if(! manager.fname) errors.push('manager fname error!');
                            if(! manager.lname) errors.push('manager lname error!');
                            if(! manager.email) errors.push('manager email error!');
                            if(! manager.bdate) errors.push('manager bdate error!');
                            if(! manager.hdate) errors.push('manager hdate error!');
                            if(! manager.phone) errors.push('manager phone error!');
                            if(! manager.salary || manager.salary <= 0) errors.push('manager salary error!');
                            if(! user.username) errors.push('manager uname error!');
                            if(! user.password) errors.push('manager password error!');
                            if(diff < 17) errors.push('not valid dates')
                            console.log(manager.hdate.split('-')[0] - manager.bdate.split('-')[0]);
                            if(! errors.length) {
                                console.log(req.body);                                
                                addmng(manager,user,connection);
                                res.end('see console for more info');
                            }else {
                                console.log(errors);
                                res.end(''+errors);
                            }
                        });

                    }

                    if (result[0].user_type == 'E') // for the first Branch Manager
                    {
                        console.log('Employee logged in -->');
                        query = "SELECT job_id,ssn from employee where user_id="+result[0].user_id;
                        connection.query(query,function(err,result){
                            if(err) throw err;
                            var job_id = result[0].job_id;
                            var mng_ssn = result[0].ssn;
                            _mngagar_ssn = mng_ssn;
                            console.log(job_id + " ssn for manager is --> " + mng_ssn);
                            if(job_id == 100){ // branch manager
                                res.render('manager');
                                app.get('/manager', (req, res) => {
                                    res.render('manager', {
                                        pagename: 'Manager'
                                    });
                                })
                                app.get('/seeusers', (req, res) => {
                                    //var ssn = result[0].ssn;
                                   /* console.log('HERE !!!!!!!!!!!!!!>>>>>>>>>>>>');
                                    console.log('SSN manager before sent is --> '+ssn);*/
                                    seemanagerusers(res,result);
                                    /*res.render('seeusers', {
                                        pagename: 'Our Users'
                                    });*/
                                });
        
                                app.get('/addEmp', (req, res) => {
                                    res.render('addEmp', {
                                        pagename: 'Add Employees'
                                    });
                                });
                                app.get('/edmanager', (req, res) => {                                   
                                   getManager(res,id);                                   
                                });
                                app.get('/addTools',function(req,res){
                                    res.render('addTools');
                                })
                                app.get('/seetools',function(req,res){
                                    seetools(res,_mngagar_ssn);
                                    /*res.render('seetools',{
                                        tools : ''
                                    });*/
                                })
                                app.post('/addTools',function(req,res){
                                    console.log(req.body);
                                    var tool = {};
                                    tool.name = req.body.name;
                                    tool.number = req.body.number;
                                    tool.company = req.body.company;
                                    tool.price = req.body.price;
                                    tool.date = req.body.Bday;
                                    var errors = [];
                                    if(! tool.name) errors.push('tool name missed!');
                                    if(! tool.price) errors.push('tool price missed!');
                                    if(! tool.number) errors.push('tool number missed!');
                                    if(! tool.company) errors.push('tool company missed!');
                                    if(! tool.date) errors.push('date is missed');
                                    if(! errors.length){
                                        console.log('manager want to add tool --> ' + _mngagar_ssn);
                                        addtool(tool,_mngagar_ssn,connection);
                                        res.end('Ok mashi');
                                    } else {
                                        console.log(errors);
                                        res.end(''+errors);
                                    }
                                    //res.end('Ok mashi');
                                })
                                app.post('/edmanager',function(req,res){
                                    editmanager(res,req,id);
                                });
                                app.post('/addclerk',function(req,res){
                                    console.log('you try to add new clerk let us see the result');
                                    var clerk = {};
                                    var user = {};
                                    var errors = [];
                                    var pass = md5(req.body.user_password);
                                    user.username = req.body.user_name;
                                    user.password = pass;
                                    clerk.ssn = req.body.ssn;
                                    clerk.fname = req.body.first_name;
                                    clerk.lname = req.body.last_name;
                                    clerk.email = req.body.user_email;
                                    clerk.bdate = req.body.Bday;
                                    clerk.hdate = req.body.Hday;
                                    clerk.phone = req.body.phone;
                                    clerk.salary = req.body.salary;
                                    console.log(clerk);
                                    console.log(user);
                                    console.log(ssn);
                                    addclerk(clerk,user,_mngagar_ssn,connection);
                                    res.end('see console for more info');
                                });
                                app.post('/addtrainer',function(req,res){
                                    console.log('you try to add new trainer let us see the result');
                                    var trainer = {};
                                    var user = {};
                                    var errors = []; // check for errors
                                    var pass = md5(req.body.user_password);
                                    user.username = req.body.user_name;
                                    user.password = pass;
                                    trainer.ssn = req.body.ssn;
                                    trainer.fname = req.body.first_name;
                                    trainer.lname = req.body.last_name;
                                    trainer.email = req.body.user_email;
                                    trainer.bdate = req.body.Bday;
                                    trainer.hdate = req.body.Hday;
                                    trainer.phone = req.body.phone;
                                    trainer.salary = req.body.salary;
                                    if(! user.username) errors.push('user name missed');
                                    if(! user.password) errors.push('password missed');
                                    if(! trainer.fname) errors.push('first name missed');
                                    if(! trainer.lname) errors.push('last name missed');
                                    if(! trainer.email) errors.push('email missed');
                                    if(! trainer.bdate) errors.push('birth date missed');
                                    if(! trainer.hdate) errors.push('hire date missed');
                                    if(! trainer.phone) errors.push('phone number missed');
                                    if(! trainer.salary) errors.push('salary missed');
                                    if(! errors.length){
                                        console.log(trainer);
                                        console.log(user);
                                        addtrainer(trainer,user,_mngagar_ssn,connection);
                                        res.end('see console for more info');
                                    } else {
                                        console.log(errors);
                                        res.end(''+errors);
                                    }
                                    
                                });
                                app.post('/addcleaner',function(req,res){
                                    console.log('You try to add new cleaner lets start :)');
                                    var cleaner = {};
                                    var user = {};
                                    var errors = []; // check for errors
                                    var pass = md5(req.body.user_password);
                                    user.username = req.body.user_name;
                                    user.password = pass;
                                    cleaner.ssn = req.body.ssn;
                                    cleaner.fname = req.body.first_name;
                                    cleaner.lname = req.body.last_name;
                                    cleaner.email = req.body.user_email;
                                    cleaner.bdate = req.body.Bday;
                                    cleaner.hdate = req.body.Hday;
                                    cleaner.phone = req.body.phone;
                                    cleaner.salary = req.body.salary;
                                    if(! user.username) errors.push('user name missed');
                                    if(! user.password) errors.push('password missed');
                                    if(! cleaner.fname) errors.push('first name missed');
                                    if(! cleaner.lname) errors.push('last name missed');
                                    if(! cleaner.email) errors.push('email missed');
                                    if(! cleaner.bdate) errors.push('birth date missed');
                                    if(! cleaner.hdate) errors.push('hire date missed');
                                    if(! cleaner.phone) errors.push('phone number missed');
                                    if(! cleaner.salary) errors.push('salary missed');
                                    if(! errors.length){
                                        console.log(cleaner);
                                        console.log(user);
                                        addcleaner(cleaner,user,_mngagar_ssn,connection);
                                        res.end('see console for more info');
                                    } else {
                                        console.log(errors);
                                        res.end(''+errors);
                                    }                                    
                                })
                                app.get('/activity',function(req,res){
                                    seeactivity(res,_mngagar_ssn);
                                   /* res.render('activity',{
                                    });*/
                                })
                                app.post('/activity',function(req,res){
                                    console.log(req.body);
                                    var activity = {};
                                    var errors = [];
                                    activity.name = req.body.name;
                                    activity.type = req.body.type;
                                    if(! activity.name) errors.push('No activity name');
                                    if(! activity.type) errors.push('No activity type');
                                    var addactivity = require('./routes/addactivity');
                                    if(! errors.length){
                                        console.log('manager want to add activity --> ' + _mngagar_ssn);
                                        addactivity(activity,_mngagar_ssn,connection);
                                        res.end('Ok mashi');
                                    } else {
                                        console.log(errors);
                                        res.end(''+errors);
                                    }                                    
                                })
                                
                                app.get('/memship',function(req,res){
                                    res.render('memship');
                                })
                            }      
                            else if(job_id == 400){ // clerk
                                res.render('clerk');
                                app.get('/clerk', (req, res) => {
                                    res.render('clerk', {
                                        pagename: 'Clerk Page'
                                    });
                                });
                                app.get('/edclerk', (req, res) => {                                    
                                    getclerk(res,id);
                                });
                                app.get('/seeMemb', (req, res) => {
                                    seemembers(res,_mngagar_ssn);
                                    /*res.render('seeMemb', {
                                        pagename: 'Our Members'
                                    });*/
                                });
                                app.get('/addMemb', (req, res) => {
                                    res.render('addMemb', {
                                        pagename: 'Add Members'
                                    });
                                });
                                app.get('/commitMemb', (req, res) => {
                                    res.render('commitMemb', {
                                        pagename: 'Commit Members'
                                    });
                                });
                                app.post('/edclerk',function(req,res){
                                    console.log('you try to update clerk');
                                    editclerk(res,req,id);
                                });
                                app.post('/addmem',function(req,res){
                                    console.log('Wow you try to add new member :)');
                                    console.log(req.body);
                                    var member = {};
                                    var user = {};
                                    var memship = {};
                                    var errors = [];
                                    var pass = md5(req.body.user_password);
                                    user.username = req.body.user_name;
                                    user.password = pass;
                                    member.fname = req.body.first_name;
                                    member.lname = req.body.last_name;
                                    member.email = req.body.user_email;
                                    member.gender = req.body.gender;
                                    member.bdate = req.body.Bday;
                                    member.jdate = req.body.Fday;
                                    member.weight = req.body.weight;
                                    member.phone = req.body.phone;
                                    member.duration = req.body.select;
                                    if(! user.username) errors.push('user name missed');
                                    if(! user.password) errors.push('password missed');
                                    if(! member.fname) errors.push('first name missed');
                                    if(! member.lname) errors.push('last name missed');
                                    if(! member.gender) errors.push('gender missed');
                                    if(! member.jdate) errors.push('date of join missed');
                                    if(! member.duration) errors.push('duration missed');
                                    if(! errors.length){
                                        console.log('Clerk want to add member --> '+id);
                                        addmem(member,user,_mngagar_ssn,connection);
                                        res.end('ok mashi');
                                    }else {
                                        console.log(errors);
                                        res.end(''+errors);
                                    }
                                    
                                    console.log(member);
                                    console.log(user);
                                })
                            }
                            else if(job_id == 200){ // trainer

                            }

                            else if(job_id == 300){ // cleaner

                            }
                        });
                        

                    }
                    else if(result[0].user_type == 'M'){ // For members ...
                        var user_id = result[0].user_id;
                        var name = result[0].user_name;
                        query = "SELECT * from MEMBER AS M INNER JOIN membership AS S ON M.member_id = S.member_id where M.user_id = '"+user_id+"';";
                        connection.query(query,function(err,result){
                            if(err) throw err;
                            console.log(result);
                            res.render('memb');
                            
                            app.get('/edmemb',function(req,res){
                                res.render('edmemb',{
                                    first_name: result[0].first_name,
                                    last_name: result[0].last_name,
                                    user_name: name
                                });
                            })

                            app.post('/edmemb',function(req,res){
                                var fname = req.body.fname;
                                var lname = req.body.lname;
                                var user = req.body.user;
                                var errors = [];
                                if(! fname ) errors.push("No first name");
                                if(! lname) errors.push('No last name');
                                if(! user) errors.push("No user name");

                                if(! errors.length){ // ADD update for employee table .................. ya dog
                                    connection.query("UPDATE users set user_name = '"+user+"' WHERE user_id = "+_id,
                                    function(err,result){
                                        if(err) throw err;
                                        console.log('Update user table');
                                    });
                                    connection.query("UPDATE member set first_name ='"+fname+"', last_name ='"+lname+"' WHERE user_id ="+_id,
                                    function(err,result){
                                    if(err) throw err;
                                    console.log('Update member table');
                                    
                                    });
                                    var oldpass = req.body.oldpass;
                                    var newpass = req.body.newpass;
                                    if(oldpass && newpass) {
                                        console.log('You try to change password');
                                        connection.query("SELECT user_password from users where user_id = "+_id+";",function(err,result){
                                            if(err) throw err;
                                            var correctpass = result[0].user_password;
                                            var passEnc = md5(oldpass);
                                            console.log(correctpass);
                                            console.log(passEnc);
                                            if(correctpass == passEnc) {
                                                console.log('Yes the password is true');
                                                var newpassword = md5(newpass);
                                                connection.query("UPDATE users set user_password ='"+newpassword+"' WHERE user_id ="+_id+";",function(err){
                                                    if(err) throw err;
                                                    console.log('New password updated');
                                                })
                                            }
                                        })
                                    }
                                    
                                };
                                res.redirect('edmemb');
                            })
                           
                        });
                        
                    }


                     
                    // res.end('Thank you');
                }
            }
        });
    } catch(err){
        console.log(err);
    }   
    //res.end('Thank you');
});


app.listen(port, () => {
    console.log(`server port is ${port}`)
});

function seebranch(req,res){
    var query = "SELECT branch_number from branch;";
    connection.query(query,function(err,result){
        if(err) throw err;
        console.log(result);
        var opt = "";
        for(var i=0;i<result.length;i++){
            opt += "<option value="+result[i].branch_number+">"+result[i].branch_number+"</option>";
        }
        res.render('checkB',{
            branches : opt
        });
    })
    
}
function editclerk(res,req,id){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var uname = req.body.user_name;
    var uemail = req.body.email;
    var errors = [];
    if(! fname) errors.push('first name missed');
    if(! lname) errors.push('last name missed');
    if(! uname) errors.push('user name missed');
    if(! uemail) errors.push('user email missed');
    console.log(errors);
    if(! errors.length){ // ADD update for employee table .................. ya dog
        connection.query("UPDATE users set user_name = '"+uname+"' WHERE user_id = "+_id,
        function(err,result){
            if(err) throw err;
            console.log('Update user table');
        });
        connection.query("UPDATE employee set first_name ='"+fname+"', last_name ='"+lname+"', email ='"+uemail+"' WHERE user_id ="+_id,
        function(err,result){
        if(err) throw err;
        console.log('Update employee table');
        
        });
        var oldpass = req.body.oldpass;
        var newpass = req.body.newpass;
        if(oldpass && newpass) {
            console.log('You try to change password');
            connection.query("SELECT user_password from users where user_id = "+_id+";",function(err,result){
                if(err) throw err;
                var correctpass = result[0].user_password;
                var passEnc = md5(oldpass);
                console.log(correctpass);
                console.log(passEnc);
                if(correctpass == passEnc) {
                    console.log('Yes the password is true');
                    var newpassword = md5(newpass);
                    connection.query("UPDATE users set user_password ='"+newpassword+"' WHERE user_id ="+_id+";",function(err){
                        if(err) throw err;
                        console.log('New password updated');
                    })
                }
            })
        }
    };
    res.redirect('edclerk');
}


function editmanager(res,req,id){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var uname = req.body.user_name;
    var uemail = req.body.user_email;
    var errors = [];
    if(! fname) errors.push('first name missed');
    if(! lname) errors.push('last name missed');
    if(! uname) errors.push('user name missed');
    if(! uemail) errors.push('user email missed');
    console.log(errors);
    if(! errors.length){ // ADD update for employee table .................. ya dog
        connection.query("UPDATE users set user_name = '"+uname+"' WHERE user_id = "+_id,
        function(err,result){
            if(err) throw err;
            console.log('Update user table');
        });
        connection.query("UPDATE employee set first_name ='"+fname+"', last_name ='"+lname+"', email ='"+uemail+"' WHERE user_id ="+_id,
        function(err,result){
        if(err) throw err;
        console.log('Update employee table');
        
        });
        var oldpass = req.body.oldpass;
        var newpass = req.body.newpass;
        if(oldpass && newpass) {
            console.log('You try to change password');
            connection.query("SELECT user_password from users where user_id = "+_id+";",function(err,result){
                if(err) throw err;
                var correctpass = result[0].user_password;
                var passEnc = md5(oldpass);
                console.log(correctpass);
                console.log(passEnc);
                if(correctpass == passEnc) {
                    console.log('Yes the password is true');
                    var newpassword = md5(newpass);
                    connection.query("UPDATE users set user_password ='"+newpassword+"' WHERE user_id ="+_id+";",function(err){
                        if(err) throw err;
                        console.log('New password updated');
                    })
                }
            })
        }
    };
    res.redirect('edmanager');
}

function getclerk(res,id){
    connection.query("SELECT * from employee E,users U where U.user_id = "+_id+" and E.user_id = U.user_id "
    ,function(err,result){
        if(err) console.error(err);
        else {
            console.log('Done data retrieved!');
            //console.log(result);   
            var clerk = {}; 
            clerk.user_name = result[0].user_name;
            clerk.fname = result[0].first_name;
            clerk.lname = result[0].last_name;
            clerk.email = result[0].email;     
                  
            console.log(clerk);
            res.render('edclerk', {
                pagename: 'Clerk Page', first_name :clerk.fname, last_name:clerk.lname,
                user_name: clerk.user_name, email : clerk.email
            });
            
            
        }
    })
}
function getManager(res,id){
    connection.query("SELECT * from employee E,users U where U.user_id = "+_id+" and E.user_id = U.user_id "
    ,function(err,result){
        if(err) console.error(err);
        else {
            console.log('Done data retrieved!');
            //console.log(result);   
            var manager = {}; 
            manager.user_name = result[0].user_name;
            manager.fname = result[0].first_name;
            manager.lname = result[0].last_name;
            manager.email = result[0].email;     
                  
            console.log(manager);
            res.render('edmanager', {
                pagename: 'Edit Infomations',first_name: manager.fname, last_name: manager.lname,
                user_name : manager.user_name, email : manager.email
            });
            
        }
    })
}
function getEmp(res,id,admin){    
    console.log(id);
    connection.query("SELECT * from employee E,users U where U.user_id = "+_id+" and E.user_id = U.user_id "
    ,function(err,result){
        if(err) console.error(err);
        else {
            
                console.log('Done data retrieved!');
                //console.log(result);    
                admin.user_name = result[0].user_name;
                admin.fname = result[0].first_name;
                admin.lname = result[0].last_name;
                admin.email = result[0].email;
                console.log(admin);
                res.render('edadmin',{
                    pagename: 'Admin Panel',first_name: admin.fname, last_name: admin.lname,
                    user_name : admin.user_name, user_email : admin.email
                }); 
        }
    });     
};

 
function getmanagers(res){
   var querymng = "SELECT * from employee AS E INNER JOIN manager AS M ON E.ssn = M.manager_ssn;";
   var querycountries = "SELECT country_name from country;";
   var querycities = "SELECT city_name from city;";
    var query = querymng + querycountries + querycities;
   connection.query(query,function(err,result){
       if(err) throw err;
       var mngoptions = ''; var mngnames=[];
       var cntoptions = ''; var cntnames=[];
       var cityoptions = ''; var citynames=[];
       for(var i=0; i<result[0].length;i++){
            mngnames.push(result[0][i].first_name+" "+result[0][i].last_name);
            mngoptions+='<option value="'+mngnames[i]+'">'+mngnames[i]+'</option>';
       }
       for(var i=0;i<result[1].length;i++){
        cntnames.push(result[1][i].country_name);
        cntoptions+='<option value="'+cntnames[i]+'">'+cntnames[i]+'</option>';
       }
       for(var i=0;i<result[2].length;i++){
        citynames.push(result[2][i].city_name);
        cityoptions+='<option value="'+citynames[i]+'">'+citynames[i]+'</option>';
       }
       var name = "mahmoud ali";
       var names = [];
       names = name.split(" ");
       console.log(names);
       //console.log(result[0][0]);
       console.log(cityoptions);
       console.log(cntoptions);
       res.render('addB',{
        pagename: 'Add Branch',managers : mngoptions ,countries:cntoptions, cities : cityoptions
    });
   })   
}
function seemembers(res,mngssn){
    var query = "SELECT branch_number from clerk where clerk_id = '"+mngssn+"';";
    connection.query(query,function(err,result){
        if(err) throw err;
        console.log(result);
        var brnum = result[0].branch_number;
        connection.query('SELECT * from member AS M INNER JOIN users AS U ON M.user_id=U.user_id where branch_number ='+brnum
        ,function(err,result){
            if(err) throw err;
            console.log(result);
            var memopt="";
            for(var i=0; i<result.length;i++){
                memopt += '<tr><td>'+(i+1)+'</td>';
                memopt += '<td>'+result[i].first_name+'</td>';
                memopt += '<td>'+result[i].last_name+'</td>';
                memopt += '<td>'+result[i].user_name+'</td>';
                memopt += '<td>'+result[i].date_of_birth+'</td>';
                memopt += '<td>'+result[i].date_of_join+'</td>';
                memopt += '<td>'+result[i].gender+'</td>';
                memopt += '<td>'+result[i].weight+'</td></tr>';
            };


            res.render('seeMemb', {
                pagename: 'Our Members', members : memopt
            });
        })


    })
}
function seetools(res,mngssn){
    var query = "SELECT branch_number from branch where manager_ssn = '"+mngssn+"';";
    connection.query(query,function(err,result){
        if(err) throw err;
        var brnum = result[0].branch_number;
        connection.query('SELECT * from tool AS T INNER JOIN branch_tools AS B ON T.product_number = B.tool_id where branch_number = '+brnum
        ,function(err,result){
            if(err) throw err;
            console.log(result);
            var toolsopt="";
            for(var i=0; i<result.length;i++){
                toolsopt += '<tr><td>'+result[i].product_number+'</td>';
                toolsopt += '<td>'+result[i].name+'</td>';
                toolsopt += '<td>'+result[i].price+'</td>';
                toolsopt += '<td>'+result[i].manufacture_company+'</td>';
                toolsopt += '<td>'+result[i].date_of_Add+'</td></tr>';
            };


            res.render('seetools',{
                tools : toolsopt
            });
        })


    })
}

function seeactivity(res,mng_ssn){
    var query = "SELECT branch_number from branch where manager_ssn = '"+mng_ssn+"';";
    connection.query(query,function(err,result){
        if(err) throw err;
        var brnum = result[0].branch_number;
        connection.query('SELECT * from type AS T INNER JOIN activity  AS A ON T.type_id = A.type_id INNER JOIN branch_activites AS B ON A.activity_id = B.activity_id where branch_number = '+brnum
        ,function(err,result){
            if(err) throw err;
            console.log(result);
            var toolsopt="";
            for(var i=0; i<result.length;i++){
                //toolsopt += '<tr><td>'+result[i].activity_id+'</td>';
                toolsopt += '<tr><td>'+(i+1)+'</td>';
                toolsopt += '<td>'+result[i].name+'</td>';
                toolsopt += '<td>'+result[i].type_value+'</td></tr>';
            };


            res.render('activity',{
                Activiteis : toolsopt
            });
        })


    })
}

function seebranches(res){
    var query = "SELECT * FROM  branch AS B, city AS C, country AS CO, Employee E ";
        query += "WHERE B.city_id = C.city_id and B.country_id = CO.country_id and E.ssn = B.manager_ssn;";

    connection.query(query,function(err,result){
        if(err) throw err;
        console.log(result);
        var branchopt = "";
        for(var i=0;i<result.length;i++){
            branchopt += '<tr> <td>'+result[i].branch_number+'</td>';
            branchopt += '<td>'+result[i].branch_name+'</td>';
            branchopt += '<td>'+result[i].city_name+'</td>';
            branchopt += '<td>'+result[i].country_name+'</td>';
            branchopt += '<td>'+result[i].street+'</td>';
            branchopt += '<td>'+result[i].first_name +" "+result[i].last_name+'</td></tr>';
           

        };
        
        res.render('seebranches',{
            pagename: 'Our Branches', branches: branchopt  
        });
    });
}

function seemanagerusers(res,result){
    //var ssnmng = result[0].ssn;
    console.log('SSN manager after sent is --> '+_mngagar_ssn);
    var querybn = "SELECT branch_number from branch where manager_ssn = '" + _mngagar_ssn +"';";
    connection.query(querybn,function(err,result){
        if(err) throw err;
        var brnum = result[0].branch_number;
        console.log("The branch number is ----> "+brnum);
       var querytr = "SELECT trainer_id from trainer where branch_number = "+brnum;
       connection.query(querytr,function(err,result){
           if(err) throw err;
           var trs = [];
           for(var i=0;i<result.length;i++){
               trs.push(result[i].trainer_id);
           }
           if(! trs) throw "No trainers ....";
           
           var queryemp = "SELECT * from users AS U,employee AS E where ssn IN ("+trs+") and U.user_id = E.user_id;"; 
           connection.query(queryemp,function(err,result){
               if(err) throw err;
               console.log('Done we get employees');
               console.log(result);
               var transopt = "";
               for(var i=0;i<result.length;i++){
                   transopt += '<tr> <td>'+result[i].ssn+'</td>';
                   transopt += '<td>'+result[i].first_name+'</td>';
                   transopt += '<td>'+result[i].last_name+'</td>';
                   transopt += '<td>'+result[i].user_name+'</td>';
                   transopt += '<td>'+result[i].email+'</td>';
                   transopt += '<td>'+result[i].date_of_birth+'</td>';
                   transopt += '<td>'+result[i].date_of_hire+'</td>';
                   transopt +=' </tr>';
                   
               };
               
              /* res.render('seeusers', {
                   pagename: 'Our Users', trainers : transopt
               });*/

               var queryck = "SELECT clerk_id from clerk where branch_number = "+brnum;
               connection.query(queryck,function(err,result){
                   if(err) throw err;
                   var clrs = [];
                   for(var i=0;i<result.length;i++){
                       clrs.push(result[i].clerk_id);
                   }
                   if(! clrs) throw "No trainers ....";
                   var queryemp = "SELECT * from users AS U,employee AS E where ssn IN ("+clrs+") and U.user_id = E.user_id;"; 
                   connection.query(queryemp,function(err,result){
                       if(err) throw err;
                       console.log('Done we get employees');
                       console.log(result);
                       var clerksopt = "";
                       for(var i=0;i<result.length;i++){
                           clerksopt += '<tr> <td>'+result[i].ssn+'</td>';
                           clerksopt += '<td>'+result[i].first_name+'</td>';
                           clerksopt += '<td>'+result[i].last_name+'</td>';
                           clerksopt += '<td>'+result[i].user_name+'</td>';
                           clerksopt += '<td>'+result[i].email+'</td>';
                           clerksopt += '<td>'+result[i].date_of_birth+'</td>';
                           clerksopt += '<td>'+result[i].date_of_hire+'</td>';
                           clerksopt +=' </tr>';
                       };

                       connection.query('SELECT * from member AS M INNER JOIN users AS U ON M.user_id=U.user_id where branch_number ='+brnum
                       ,function(err,result){
                           if(err) throw err;
                           console.log(result);
                           var memopt="";
                           for(var i=0; i<result.length;i++){
                               memopt += '<tr><td>'+(i+1)+'</td>';
                               memopt += '<td>'+result[i].first_name+'</td>';
                               memopt += '<td>'+result[i].last_name+'</td>';
                               memopt += '<td>'+result[i].user_name+'</td>';
                               memopt += '<td>'+result[i].date_of_birth+'</td>';
                               memopt += '<td>'+result[i].date_of_join+'</td>';
                               memopt += '<td>'+result[i].gender+'</td>';
                               memopt += '<td>'+result[i].weight+'</td></tr>';
                           };
                           var querycleaners = "SELECT * from cleaner AS C INNER JOIN employee AS E ON C.cleaner_id = E.ssn INNER JOIN users AS U ON E.user_id = U.user_id ";
                           querycleaners += "where branch_number = "+brnum+";";
                           connection.query(querycleaners,function(err,result){
                            if(err) throw err;
                            console.log('Done we get employees');
                            console.log(result);
                            var cleanrsopt = "";
                            for(var i=0;i<result.length;i++){
                                cleanrsopt += '<tr> <td>'+result[i].ssn+'</td>';
                                cleanrsopt += '<td>'+result[i].first_name+'</td>';
                                cleanrsopt += '<td>'+result[i].last_name+'</td>';
                                cleanrsopt += '<td>'+result[i].user_name+'</td>';
                                cleanrsopt += '<td>'+result[i].email+'</td>';
                                cleanrsopt += '<td>'+result[i].date_of_birth+'</td>';
                                cleanrsopt += '<td>'+result[i].date_of_hire+'</td>';
                                cleanrsopt +=' </tr>';
                            };
                            
                                res.render('seeusers', {
                                    pagename: 'Our Users', clerks : clerksopt,trainers :transopt, members:memopt, Cleaners : cleanrsopt
                                });
                            
                           
                        });
               
                       })
           
                       
                   })
               })
           })           
       })
    }) 
}

function seeadminusers(res,req){
    var num = req.body.select;
    console.log('Any thing shown here');
    console.log(num);
    //console.log('SSN manager after sent is --> '+120332010);
    var querybn = "SELECT branch_number from branch where branch_number = '" + num +"';";
    connection.query(querybn,function(err,result){
        if(err) throw err;
        var brnum = result[0].branch_number;
        console.log("The branch number is ----> "+brnum);
       var querytr = "SELECT trainer_id from trainer where branch_number = "+brnum;
       connection.query(querytr,function(err,result){
           if(err) throw err;
           var trs = [];
           for(var i=0;i<result.length;i++){
               trs.push(result[i].trainer_id);
           }
           if(! trs) throw "No trainers ....";
           
           var queryemp = "SELECT * from users AS U,employee AS E where ssn IN ("+trs+") and U.user_id = E.user_id;"; 
           connection.query(queryemp,function(err,result){
               if(err) throw err;
               console.log('Done we get employees');
               console.log(result);
               var transopt = "";
               for(var i=0;i<result.length;i++){
                   transopt += '<tr> <td>'+result[i].ssn+'</td>';
                   transopt += '<td>'+result[i].first_name+'</td>';
                   transopt += '<td>'+result[i].last_name+'</td>';
                   transopt += '<td>'+result[i].user_name+'</td>';
                   transopt += '<td>'+result[i].email+'</td>';
                   transopt += '<td>'+result[i].phone_number+'</td>';
                   transopt += '<td>'+result[i].date_of_birth+'</td>';
                   transopt += '<td>'+result[i].date_of_hire+'</td>';
                   transopt +=' </tr>';
                   
               };
               
              /* res.render('seeusers', {
                   pagename: 'Our Users', trainers : transopt
               });*/

               var queryck = "SELECT clerk_id from clerk where branch_number = "+brnum;
               connection.query(queryck,function(err,result){
                   if(err) throw err;
                   var clrs = [];
                   for(var i=0;i<result.length;i++){
                       clrs.push(result[i].clerk_id);
                   }
                   if(! clrs) throw "No trainers ....";
                   var queryemp = "SELECT * from users AS U,employee AS E where ssn IN ("+clrs+") and U.user_id = E.user_id;"; 
                   connection.query(queryemp,function(err,result){
                       if(err) throw err;
                       console.log('Done we get employees');
                       console.log(result);
                       var clerksopt = "";
                       for(var i=0;i<result.length;i++){
                           clerksopt += '<tr> <td>'+result[i].ssn+'</td>';
                           clerksopt += '<td>'+result[i].first_name+'</td>';
                           clerksopt += '<td>'+result[i].last_name+'</td>';
                           clerksopt += '<td>'+result[i].user_name+'</td>';
                           clerksopt += '<td>'+result[i].email+'</td>';
                           clerksopt += '<td>'+result[i].phone_number+'</td>';
                           clerksopt += '<td>'+result[i].date_of_birth+'</td>';
                           clerksopt += '<td>'+result[i].date_of_hire+'</td>';
                           clerksopt +=' </tr>';
                       };

                       connection.query('SELECT * from member AS M INNER JOIN users AS U ON M.user_id=U.user_id where branch_number ='+brnum
                       ,function(err,result){
                           if(err) throw err;
                           console.log(result);
                           var memopt="";
                           for(var i=0; i<result.length;i++){
                               memopt += '<tr><td>'+(i+1)+'</td>';
                               memopt += '<td>'+result[i].first_name+'</td>';
                               memopt += '<td>'+result[i].last_name+'</td>';
                               memopt += '<td>'+result[i].user_name+'</td>';
                               memopt += '<td>'+result[i].date_of_birth+'</td>';
                               memopt += '<td>'+result[i].date_of_join+'</td>';
                               memopt += '<td>'+result[i].gender+'</td>';
                               memopt += '<td>'+result[i].weight+'</td></tr>';
                           };
                           var querycleaners = "SELECT * from cleaner AS C INNER JOIN employee AS E ON C.cleaner_id = E.ssn INNER JOIN users AS U ON E.user_id = U.user_id ";
                           querycleaners += "where branch_number = "+brnum+";";
                           connection.query(querycleaners,function(err,result){
                            if(err) throw err;
                            console.log('Done we get employees');
                            console.log(result);
                            var cleanrsopt = "";
                            for(var i=0;i<result.length;i++){
                                cleanrsopt += '<tr> <td>'+result[i].ssn+'</td>';
                                cleanrsopt += '<td>'+result[i].first_name+'</td>';
                                cleanrsopt += '<td>'+result[i].last_name+'</td>';
                                cleanrsopt += '<td>'+result[i].user_name+'</td>';
                                cleanrsopt += '<td>'+result[i].email+'</td>';
                                cleanrsopt += '<td>'+result[i].phone_number+'</td>';
                                cleanrsopt += '<td>'+result[i].date_of_birth+'</td>';
                                cleanrsopt += '<td>'+result[i].date_of_hire+'</td>';
                                cleanrsopt +=' </tr>';
                            };
                            console.log(memopt);
                            res.render('singleBranch', {
                                pagename: 'Branch',  members:memopt, trainers:transopt ,clerks : clerksopt, emps: cleanrsopt
                            });
                            
                                /*res.render('si', {
                                    pagename: 'Our Users', clerks : clerksopt,trainers :transopt, members:memopt, Cleaners : cleanrsopt
                                });*/
                            
                           
                        });
               
                       })
           
                       
                   })
               })
           })           
       })
    }) 
}
/*function seemembers(res){
    

}*/