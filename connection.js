const mysql = require('mysql2');
var mysqlConnnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3307',
    password:'123456',
    database:'exchangerdb'
})

mysqlConnnection.connect((err)=>{
    if(err){
        console.log('error in db connection: '+JSON.stringify(err,undefined,2));
    }else{
        console.log('db connected successfully');
    }
})

module.exports = mysqlConnnection