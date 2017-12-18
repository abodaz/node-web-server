module.exports = function addactivity(activity,mng_ssn,connection){
    var type = activity.type;
    connection.query("SELECT type_id from type where type_value ='"+type+"';",function(err,result){
        if(err) {console.log('1');throw err};
        if(! result.length){
            connection.query("INSERT INTO type(type_value) VALUES ('"+type+"');",function(err,result){
                if(err) throw err;
                console.log(result);
                var type_id =  result.insertId;
                addinTool(activity,type_id,connection,mng_ssn);
            });            
        } else {
            var type_id = result[0].type_id;
            addinTool(activity,type_id,connection,mng_ssn);
        }
    });
}

function addinTool(activity,type_id,connection,mng_ssn){
var query = "INSERT INTO activity(name,type_id,status_id) VALUES ('"+activity.name+"',"+type_id+",1);";
connection.query(query,function(err,result){
    if(err) throw err;
    var ac_id = result.insertId;
    console.log('Activity inserted successfully!');
    connection.query("SELECT branch_number from branch where manager_ssn ='"+mng_ssn+"';",function(err,result){
        if(err) throw err;
        var branch_number = result[0].branch_number;
        connection.query("INSERT INTO branch_activites VALUES ("+branch_number+","+ac_id+");",function(err){
            if(err) throw err;
            console.log('Done inserted into branch activites');
        })
    })
})
}