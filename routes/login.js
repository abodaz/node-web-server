module.exports = function log(name,pass,connection,id){
    var query = "SELECT user_id,user_name from users where user_name = '"+name+"' and user_password = '"+pass+"';"
    connection.query(query,function(err,result){
        
        if(err){
            console.error(err);
            res.end('Error Info');
        }
        else{
            console.log(result);
             id = result[0].user_id;
             console.log(id);
            //var admin = {};
            //admin.user_name = result[0].user_name;
            //console.log(admin.user_name+"   " +result[0].user_name ); 
                      
        }
        
    });
   

}