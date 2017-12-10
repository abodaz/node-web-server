var Request = require('tedious').Request;
module.exports = function addEmp(name,pass,connection){
    
    
<<<<<<< HEAD
    request = new Request(
        "INSERT INTO Users VALUES('1,"+name+"','"+pass+"');",
=======
    /*request = new Request(
        "INSERT INTO Users VALUES(1,'"+name+"','"+pass+"');",
>>>>>>> f11cc0b461e8dbd6cdfd715460b097773c404a69
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