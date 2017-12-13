module.exports = function addbranch(branch,connection){
    var query = "";
    connection.query(query,function(err){
        if(err) throw err;
        console.log('New Branch Added --> ' +branch);
    });
}