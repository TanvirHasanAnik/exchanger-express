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

function addProduct(req,res){
  if(req.session.user){
    const user = req.session.user;
    const product = req.body;
    if(product.categoryid != "" && product.productTitle != ""){
      const productData = [user.id,product.categoryid, product.productTitle, product.productDescription];
      connection.query('INSERT INTO products(userid,categoryid,productTitle,productDescription) values(?)',[productData],(err,rows)=>{
          if(err){
              console.log(err);
          }else{
              console.log(rows);
              return res.status(200).json({message: 'Item Added'});
          }
      })
    }else{
      return res.status(400).json({message: 'Category and title should not be empty'});
    }
  } else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

function matchUser(req,res){
  //load all expected category id of current user 
  var usersWithExpectedProducts = [];
  connection.query('SELECT categoryid FROM expectedproduct WHERE userid = 3',(err,expCategoryId)=>{
      if(err){
          console.log(err);
      }else{
        expCategoryId.forEach(categoryId => {
          //load all user id that has product of this category 
          connection.query('SELECT DISTINCT users.id FROM users inner join products on products.userid = users.id WHERE categoryid = ?',categoryId,(err,userId)=>{
              if(err){
                  console.log(err);
              }else{
                userId.forEach(id => {
                  if(!usersWithExpectedProducts.includes(id)){
                    usersWithExpectedProducts.push(id);
                  }
                });
              }
          })
        });
      }
  })
}

function getCategory(req,res){
  connection.query('SELECT * FROM category order by categoryname',(err,rows)=>{
      if(err){
          console.log(err);
      }else{
          console.log(rows);
          return res.status(200).json(rows);
      }
  })
}

function getExpectedProductList(req,res){
  if(req.session.user){
  const user = req.session.user;
  connection.query('SELECT categoryname from category inner join expectedproduct on expectedproduct.categoryid = category.id where expectedproduct.userid = ?',user.id,(err,rows)=>{
      if(err){
          console.log(err);
      }else{
          console.log(rows);
          return res.status(200).json(rows);
      }
  })
  }else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

function addExpectedProduct(req,res){
  if(req.session.user){
    const user = req.session.user;
    const product = req.body;
    if(product.categoryid != ""){
      const productData = [user.id,product.categoryid];
      connection.query('INSERT INTO expectedproduct(userid,categoryid) values(?)',[productData],(err,rows)=>{
        if(err){
          console.log(err);
          if(err.code == "ER_DUP_ENTRY"){
            return res.status(400).json({message: 'category already exists'});
          }
        }else{
              console.log(rows);
              return res.status(200).json({message: 'Item Added'});
          }
      })
    }else{
      return res.status(400).json({message: 'Category not choosen'});
    }
  } else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

module.exports = {productsList,addProduct,getCategory,addExpectedProduct,getExpectedProductList};
