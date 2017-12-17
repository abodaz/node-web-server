module.exports = function addtrainer(trainer,user,mngssn,connection){
    var job_id = '200';
    query = "INSERT INTO employee VALUES('"+trainer.ssn+"','"+trainer.fname+"','"+trainer.lname+"','"+trainer.email+"','"+trainer.phone+"','"+trainer.bdate+"','"+trainer.hdate+"','"+job_id+"',";
    
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
                    connection.query("SELECT branch_number from branch where manager_ssn ='"+mngssn+"';",function(err,result){
                        if(err) {
                            console.log('4')
                            throw err;
                        }
                        console.log(result[0]);
                        var brnum = result[0].branch_number;
                        connection.query("INSERT INTO trainer VALUES('"+trainer.ssn+"',20,'"+trainer.salary+"',"+brnum+");",function(err){
                            if(err){
                                console.log('3');
                                throw err;  
                            }                       
                            console.log("trainer Added --> "+trainer);
                        })
                    })
                    
                })
            });
        });
}