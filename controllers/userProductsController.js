var connection = require('../connection');

function productsList(req,res){
    connection.query('SELECT categoryname from category inner join products on products.categoryid = category.id where products.userid = ?',[req.params.id],(err,rows)=>{
    
    if(err){
        console.log(err);
    }else{
        console.log(rows);
        return res.status(200).json(rows);
    }
  })
}

module.exports = {productsList};
