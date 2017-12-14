module.exports = function addbranch(branch,connection){
    var name = [];
    name = branch.mng.split(" ");
    connection.query("SELECT ssn from employee where first_name ='"+name[0]+"' and last_name ='"+name[1]+"';SELECT city_id from city where city_name ='"+branch.city+"'; SELECT country_id from country where country_name ='"+branch.country+"';"
        ,function(err,result){
            if(err) throw err;
            var mngssn = result[0][0].ssn;
            var cityid = result[1][0].city_id;
            var cntid = result[2][0].country_id;
            //console.log(result[0]);
            var query = "INSERT INTO branch values("+branch.number+",'"+branch.name+"','"+mngssn+"',";
            query += "'"+branch.street+"',"+cityid+","+cntid+");";
            console.log(branch);
            console.log(query);
            connection.query(query,function(err){
                if(err) throw err;
                console.log('New Branch Added --> ' +branch);
             })
        })
}
