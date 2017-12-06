var Request = require('tedious').Request;
module.exports = function addEmp(name,pass,connection){
    
    
    request = new Request(
        "INSERT INTO Users VALUES('"+name+"','"+pass+"');",
           function(err, rowCount, rows) 
              {
                  if(err) console.error(err);
                  console.log(rowCount + ' row(s) inserted');
              }
          );             
     connection.execSql(request);
    



}