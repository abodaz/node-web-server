module.exports = function addaddress(address,connection){
    var quetTest = "SELECT * from country where country_id ="+address.postal+" or country_name = '"+address.country+"';";
    connection.query(quetTest,function(err,result){
        if (err) throw err;
        if(! result.length) console.log('You can add new address');
        else { // just be sure that the city is not stored if, then print address is excisted else add to city table only.
            connection.query("SELECT * from city where city_name ='"+address.city+"';",function(err,result){
                if(err) throw err;
                if(! result.length) // add to city table.
                {
                    console.log('new city WoW');
                    connection.query("INSERT INTO city(city_name) VALUES ('"+address.city+"');",function(err){
                        if(err) throw err;
                        console.log('city added done!');
                    })    
                } else {
                    console.log('The address is excisted!');
                }
            })
            
        }
    })
};