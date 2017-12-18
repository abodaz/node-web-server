module.exports = function addcleaner(cleaner,user,mngssn,connection){
    var job_id = '400';
    query = "INSERT INTO employee VALUES('"+cleaner.ssn+"','"+cleaner.fname+"','"+cleaner.lname+"','"+cleaner.email+"','"+cleaner.phone+"','"+cleaner.bdate+"','"+cleaner.hdate+"','"+job_id+"',";
    
    connection.query("INSERT INTO USERS(user_name,user_password,user_type) VALUES('"+user.username+"','"+user.password+"','E');",
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
                    console.log('manager ssn to add cleaner is ---> '+mngssn);
                    connection.query("SELECT branch_number from branch where manager_ssn ='"+mngssn+"';",function(err,result1){
                        if(err) {
                            console.log('4')
                            throw err;
                        }
                        console.log(result1[0]);
                        var brnum = result1[0].branch_number;
                        connection.query("INSERT INTO cleaner VALUES('"+cleaner.ssn+"','"+cleaner.salary+"',"+brnum+");",function(err){
                            if(err){
                                console.log('3');
                                throw err;  
                            }                       
                            console.log("cleaner Added --> "+cleaner);
                        })
                    })
                    
                })
            });
        });
}