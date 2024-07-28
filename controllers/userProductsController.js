var connection = require('../connection');

function productsList(req,res){
    console.log('id from req parameters: '+req.query.id);
    connection.query('SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id where products.userid = ?',[req.query.id],(err,rows)=>{
    
    if(err){
        console.log(err);
        return res.err.status;
    }else{
        console.log(rows);
        return res.status(200).json(rows);
    }
  })
}

module.exports = {productsList};
