var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var md5 = require('md5');
const addEmp = require('./routes/addEmp');

var mysql = require('mysql');


const port = process.env.PORT || 8888;

var app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/adminViews'));


//connectToDb();
var config =
    {
        user: 'root',
        password: '2143906',
        host: 'localhost', // update me
        database: 'gym',
        port: 3306
    };
var connection = mysql.createConnection(config);
connection.connect(function (err) {
    if (err) console.error(err);
    else console.log('Connected!');
});

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

app.get('/seebranches', (req, res) => {
    res.render('seebranches', {
        pagename: 'Our Branches'
    });
});

app.get('/addBM', (req, res) => {
    res.render('addBM', {
        pagename: 'Add Branch Manager'
    });
});

app.get('/edadmin', (req, res) => {
    res.render('edadmin', {
        pagename: 'Admin Panel'
    });
});
app.get('/singleBranch', (req, res) => {
    res.render('singleBranch', {
        pagename: 'Branch'
    });
})
app.get('/addB', (req, res) => {
    res.render('addB', {
        pagename: 'Add Branch'
    });
});
app.get('/addAddress', (req, res) => {
    res.render('addAddress', {
        pagename: 'Add Address'
    });
});
//manager
app.get('/manager', (req, res) => {
    res.render('manager', {
        pagename: 'Manager Page'
    });
})
app.get('/seeusers', (req, res) => {
    res.render('seeusers', {
        pagename: 'Our Users'
    });
});
app.get('/addEmp', (req, res) => {
    res.render('addEmp', {
        pagename: 'Add Employees'
    });
});
app.get('/addEmp', (req, res) => {
    res.render('addEmp', {
        pagename: 'Add Employees'
    });
});
app.get('/addTools', (req, res) => {
    res.render('addTools', {
        pagename: 'Add Tools'
    });
});
app.get('/seetools', (req, res) => {
    res.render('seetools', {
        pagename: 'See Tools'
    });
});
app.get('/edmanager', (req, res) => {
    res.render('edmanager', {
        pagename: 'Edit Infomations'
    });
});
app.get('/memship', (req, res) => {
    res.render('memship', {
        pagename: 'Membership'
    });
});
app.get('/activity', (req, res) => {
    res.render('activity', {
        pagename: 'Activity'
    });
});
//clerk
app.get('/clerk', (req, res) => {
    res.render('clerk', {
        pagename: 'Clerk Page'
    });
});
app.get('/edclerk', (req, res) => {
    res.render('edclerk', {
        pagename: 'Clerk Page'
    });
});
app.get('/seeMemb', (req, res) => {
    res.render('seeMemb', {
        pagename: 'Our Members'
    });
});
app.get('/addMemb', (req, res) => {
    res.render('addMemb', {
        pagename: 'Add Members'
    });
});
app.get('/checkB', (req, res) => {
    res.render('checkB', {
        pagename: 'Check Branch'
    });
});
//member
app.get('/memb', (req, res) => {
    res.render('memb', {
        pagename: 'Member Page'
    });
})
app.get('/edmemb', (req, res) => {
    res.render('edmemb', {
        pagename: 'edit Info'
    });
})
app.get('/seeinfo', (req, res) => {
    res.render('seeinfo', {
        pagename: 'My Info'
    });
})
app.get('/addinfo', (req, res) => {
    res.render('addinfo', {
        pagename: 'Add Info'
    });
})
app.get('/delmemb', (req, res) => {
    res.render('delmemb', {
        pagename: 'Delete Member'
    });
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
    console.log('You have entered info to log in -----');
    var name = req.body.username;
    var pass = req.body.password;

    var passEncr = md5(pass);
    console.log('Your name is --> ' + name + ', and the password is --> ' + pass);
    console.log('Password after encr is --> ' + passEncr);
    connection.query("SELECT user_id from users where user_name = '" + name + "' and user_password = '" + passEncr + "';",
        function (err, result) {
            if (err) {
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
                    console.log(result[0].user_id);
                    if (id == 1) // for the only Admin
                    {
                        res.render('admin');
                        app.get('/admin', (req, res) => {
                            res.render('admin', {
                                pagename: 'Admin Panel'
                            });
                        });

                        app.get('/seebranches', (req, res) => {
                            res.render('seebranches', {
                                pagename: 'Our Branches'
                            });
                        });

                        app.get('/addBM', (req, res) => {
                            res.render('addBM', {
                                pagename: 'Add Branch Manager'
                            });
                        });
                        app.get('/addB', (req, res) => {
                            res.render('addB', {
                                pagename: 'Add Branch'
                            });

                            app.get('/singleBranch', (req, res) => {
                                res.render('singleBranch', {
                                    pagename: 'Branch'
                                });
                            });
                            app.get('/addAddress', (req, res) => {
                                res.render('addAddress', {
                                    pagename: 'Add Address'
                                });
                            });

                            app.get('/edadmin', (req, res) => {
                                res.render('edadmin', {
                                    pagename: 'Admin Panel'
                                });
                            });

                            app.get('/checkB', (req, res) => {
                                res.render('checkB', {
                                    pagename: 'Check Branch'
                                });
                            });
                        });
                    }

                    if (id == 2) // for the first Branch Manager
                    {
                        res.render('manager');
                        app.get('/manager', (req, res) => {
                            res.render('manager', {
                                pagename: 'Manager'
                            });
                        })
                        app.get('/seeusers', (req, res) => {
                            res.render('seeusers', {
                                pagename: 'Our Users'
                            });
                        });

                        app.get('/addEmp', (req, res) => {
                            res.render('addEmp', {
                                pagename: 'Add Employees'
                            });
                        });

                        app.get('/addTools', (req, res) => {
                            res.render('addTools', {
                                pagename: 'Add Tools'
                            });
                        });
                        app.get('/seetools', (req, res) => {
                            res.render('seetools', {
                                pagename: 'See Tools'
                            });
                        });
                        app.get('/edmanager', (req, res) => {
                            res.render('edmanager', {
                                pagename: 'Edit Infomations'
                            });
                        });

                    }
                    if (id == 3) // for the first clerk
                    {
                        app.get('/clerk', (req, res) => {
                            res.render('clerk', {
                                pagename: 'Clerk Page'
                            });
                        });
                        app.get('/edclerk', (req, res) => {
                            res.render('edclerk', {
                                pagename: 'Clerk Page'
                            });
                        });
                        app.get('/seeMemb', (req, res) => {
                            res.render('seeMemb', {
                                pagename: 'Our Members'
                            });
                        });
                        app.get('/addMemb', (req, res) => {
                            res.render('addMemb', {
                                pagename: 'Add Members'
                            });
                        });
                        app.get('/delmemb', (req, res) => {
                            res.render('delmemb', {
                                pagename: 'Delete Member'
                            });
                        });
                    }
                    // res.end('Thank you');
                }
            }
        });
    //res.end('Thank you');
})


app.listen(port, () => {
    console.log(`server port is ${port}`)
});





