

module.exports = function addEmp(name, pass, connection) {

     connection.query("INSERT INTO Users(user_name,user_password) VALUES('"+name+"','"+pass+"');",function(err){
         if(err) console.error(err);
         else console.log('new User Added --> ' + name);
     });

}

