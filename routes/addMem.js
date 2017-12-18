module.exports = function addmem(member,user,clerk_ssn,connection){
    console.log(clerk_ssn);
    query = "SELECT branch_number from clerk where clerk_id = '"+clerk_ssn+"';";
    connection.query(query,function(err,result){
        if(err) throw err;
        console.log(result);
        var brnum = result[0].branch_number;
        var queryuser = "INSERT INTO USERS(user_name,user_password,user_type) VALUES('"+user.username+"','"+user.password+"','M')";
        connection.query(queryuser,function(err,result){
            if(err){console.log('1'); throw err;}
            var user_id = result.insertId;
            var querymem = "INSERT INTO member(first_name,last_name,gender,date_of_birth,date_of_join,weight,branch_number,user_id) ";
            querymem += "VALUES('"+member.fname+"','"+member.lname+"','"+member.gender+"','"+member.bdate+"','"+member.jdate+"',"+member.weight+","+brnum+","+user_id+");";
            connection.query(querymem,function(err,result){
                if(err) throw err;
                console.log("I think we've added a new member O.o");
            })
        })
        
    })

}