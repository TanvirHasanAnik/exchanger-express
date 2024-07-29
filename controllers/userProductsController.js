var connection = require('../connection');

function productsList(req,res){
    if(req.session.user){
    const user = req.session.user;
    console.log(`session id:${req.sessionID}, user id ${user.id}`);
    connection.query('SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id where products.userid = ?',[user.id],(err,rows)=>{
    
    if(err){
        console.log(err);
        return res.err.status;
    }else{
        console.log(rows);
        return res.status(200).json(rows);
    }
  })
  }else {
    console.log('Please sign in')
    return res.status(400).json({message: 'Not logged in'});
  }
}

module.exports = {productsList};
