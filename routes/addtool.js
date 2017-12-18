module.exports = function addtool(tool,mng_ssn,connection){
    var query = "INSERT INTO tool VALUES("+tool.number+",'"+tool.name+"','"+tool.company+"',1,"+tool.price+",'"+tool.date+"');";
    connection.query(query,function(err){
        if(err) throw err;
        console.log('New Tool added');
        var tool_id = tool.number;
        connection.query("SELECT branch_number from branch where manager_ssn ='"+mng_ssn+"';",function(err,result){
            if(err) throw err;
            var branch_number = result[0].branch_number;
            connection.query("INSERT INTO branch_tools VALUES ("+branch_number+","+tool_id+");",function(err){
                if(err) throw err;
                console.log('Done inserted into branch tools');
                connection.end();
            })
        })
    })

    
}