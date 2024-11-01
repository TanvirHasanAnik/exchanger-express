var connection = require('../connection');

async function allProductList(req,res){
  try {
    const [result] = await connection.query('SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id');
    return res.status(200).json(result);
  } catch (error) {
    console.error('Database query error:', error);
    
    return res.status(500).json({ 
        error: 'Internal Server Error: Unable to retrieve product list.' 
    });
  }
}

async function expectedProductList(req,res){
  if(req.session.user){
    try {
      const user = req.session.user;
      var arr = [];
      const [result] = await connection.query('SELECT categoryid FROM expectedproduct WHERE userid = ?',user.id);
      
      for(const expCatId of result){
        const [rows] = await connection.query('SELECT categoryname,productTitle,productDescription from products inner join category on category.id = products.categoryid where category.id = ?',[expCatId.categoryid]);
        rows.forEach(row => {
          arr.push(row);
        });
      }
      return res.status(200).json(arr);
    } catch (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Internal Server Error: Unable to retrieve expected product list.' });
    }
  }else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

async function productsList(req,res){
    var user = 0;
      if(req.query.userid){
        const reqUser = req.query.userid;
        user = reqUser;
      }
    
    else if(req.session.user){
      const loggedUser = req.session.user.id;
      user = loggedUser;
    }else {
      console.log('Please sign in')
      return res.status(400).json({message: 'Not logged in'});
    }
    const [products] = await connection.query('SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id where products.userid = ?',user);
    console.log(products);
    return res.status(200).json(products);
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

//-------------------------------------------------experimental--------------------------------
function expectedCategoryId(req,res){
    //load all expected category id of current user 
    connection.query('SELECT categoryid FROM expectedproduct WHERE userid = ?',userId,(err,expCategoryId)=>{
        if(err){
            console.log(err);
        }else{
          userIdWithExpectedProduct(expCategoryId,req,res);
        }
    });
}

function userIdWithExpectedProduct(expCategoryId,req,res){
  var ids = [];
  expCategoryId.forEach(ecid => {
    //load all user id that has product of this category 
    connection.query('SELECT DISTINCT users.id FROM users inner join products on products.userid = users.id WHERE categoryid = ?',ecid,(err,userId)=>{
        if(err){
            console.log(err);
        }else{
          userId.forEach(id => {
            if(!ids.includes(id)){
              ids.push(id);
            }
          });
          if(expCategoryId[expCategoryId.length-1] === ecid){
            asd(ids,req,res);
            console.log(ids);
          }
        }
    })
  });
}
function asd(ids,req,res){
  var matchedid = [];
  if(req.session.user){
  const user = req.session.user;
  console.log(`session id:${req.sessionID}, user id ${user.id}`);
  connection.query('SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id where products.userid = ?',[user.id],(err,userProducts)=>{
  
  if(err){
      console.log(err);
      return res.err.status;
  }else{
      ids.forEach(expProductOwner => {
        connection.query('SELECT categoryid FROM expectedproduct WHERE expectedproduct.userid = ?',expProductOwner,(err,ProductOwnerExpcategoryid)=>{
          if(err){
              console.log(err);
          }else{
            ProductOwnerExpcategoryid.forEach(poEcid => {
              userProducts.forEach(userP => {
                if(poEcid == userP){
                  matchedid.push(expProductOwner);
                  if(ids[ids.length-1] === expProductOwner){
                    res.status(200).json(matchedid);
                    console.log(matchedid);
                  }
                }
              })
            });
          }
      })
      })
  }
})
}
}
async function matchUser(req,res){
  if(req.session.user){
    const user = req.session.user;
    const userId = user.id;
    const userIdWithExpectedProduct = [];
    const userArray = [];
    const [expectedCategoryId] = await connection.query('SELECT categoryid FROM expectedproduct WHERE userid = ?',userId);
    
    console.log(expectedCategoryId);
    for (const expCatId of expectedCategoryId) {
      const [rows] = await connection.query(
          'SELECT DISTINCT users.id FROM users inner join products on products.userid = users.id WHERE products.categoryid = ?',
          [expCatId.categoryid]
      );
      rows.forEach(row => {
          if (!userIdWithExpectedProduct.includes(row.id)) {
              userIdWithExpectedProduct.push(row.id);
          }
      });
  }
    console.log("Exp product userid: "+userIdWithExpectedProduct);
    for(const x of userIdWithExpectedProduct){
      console.log(x);
      const [expUser] = await connection.query('SELECT * FROM users WHERE users.id = ?',[x]);
      userArray.push(expUser[0]);
    }
  
    return res.status(200).json(userArray);
  }else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

function matchUserOld(req,res){
  if(req.session.user){
    const user = req.session.user;
    //load all expected category id of current user 
    var usersWithExpectedProducts = [];
    connection.query('SELECT categoryid FROM expectedproduct WHERE userid = ?',user.id,(err,expCategoryId)=>{
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
                      if(expCategoryId[expCategoryId.length-1] === categoryId){
                        console.log(usersWithExpectedProducts);
                      }
                    }
                  });
                }
            })
          });
        }
    });
    console.log(usersWithExpectedProducts);
    
  }else{
    return res.status(400).json({message: 'Not logged in'});
  }
}
//------------------------------------------------------------------------------------



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

module.exports = {productsList,addProduct,getCategory,addExpectedProduct,getExpectedProductList,matchUser,allProductList,expectedProductList};
