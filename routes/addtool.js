module.exports = function addtool(tool,connection){
    var query = "INSERT INTO tool VALUES("+too.number+",'"+tool.name+"','"+tool.company+"',1,"+tool.price+");";
    connection.query(query,function(err,result){
        
    })
}