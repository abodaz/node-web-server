var Request = require('tedious').Request;
module.exports = function addEmp(name,pass,connection){
    
    
    /*request = new Request(
        "INSERT INTO Users VALUES(1,'"+name+"','"+pass+"');",
           function(err, rowCount, rows) 
              {
                  if(err) console.error(err);
                  console.log(rowCount + ' row(s) inserted');
              }
          );             
     connection.execSql(request);*/

     connection.query("INSERT INTO Users VALUES(1,'"+name+"','"+pass+"');",function(err){
         if(err) console.error(err);
         else console.log('row inserted');
     });
    



}