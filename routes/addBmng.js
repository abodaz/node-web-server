module.exports = function addmng(manager, user,connection){
    var job_id = '100';
    query = "INSERT INTO employee VALUES('"+manager.ssn+"','"+manager.fname+"','"+manager.lname+"','"+manager.email+"','"+manager.phone+"','"+manager.bdate+"','"+manager.hdate+"','"+job_id+"',";

    connection.query("INSERT INTO USERS(user_name,user_password) VALUES('"+user.username+"','"+user.password+"');",
        function(err){
            if(err) throw err;
            console.log("new user added");
            connection.query("SELECT user_id from users where user_name = '"+user.username+"';",function(err,result){
                if(err) {
                    console.log('1')
                    throw err;
                }
                var user_id = result[0].user_id;
                query += "'"+user_id+"');";
                console.log(query);
                connection.query(query,function(err){
                    if(err) {
                        console.log('2')
                        throw err;
                    }
                    console.log("new employee added");
                    connection.query("INSERT INTO manager VALUES('"+manager.ssn+"','"+manager.salary+"');",function(err){
                        if(err){
                            console.log('3');
                            throw err;  
                        }                       
                        console.log("branch manager Added --> "+manager);
                    })
                })
            });
        });
}