
module.exports = function addEmp(name, pass, connection) {



    connection.query("INSERT INTO Users VALUES(1,'" + name + "','" + pass + "');", function (err) {
        if (err) console.error(err);
        else console.log('row inserted');
    });




}