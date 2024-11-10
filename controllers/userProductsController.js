var connection = require('../connection');
var httpMessage = require('../httpMessage');

async function allProductList(req,res){
  try {
    const [result] = await connection.query('SELECT products.id,categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id ORDER BY products.id DESC');
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
        const [rows] = await connection.query('SELECT products.id,categoryname,productTitle,productDescription from products inner join category on category.id = products.categoryid where category.id = ?  ORDER BY products.id DESC',[expCatId.categoryid]);
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


//for single product page
async function getProduct(req,res){
  
  if(req.query.productid){
    const productId = req.query.productid;
    try {
      const [result] = await connection.query('SELECT products.userid,categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id WHERE products.id = ?',productId);
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error('Database query error:', error);
      
      return httpMessage.serverError(res);
    }
  }else{
    return httpMessage.serverError(res);
  }
}

//for list of owned products
async function productsList(req,res){
    var user;
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
    const [products] = await connection.query('SELECT categoryname,productTitle,productDescription from category inner join products on products.categoryid = category.id where products.userid = ?  ORDER BY products.id DESC',user);
    console.log(products);
    return res.status(200).json(products);
}

async function addProduct(req,res){
  if(req.session.user){
    const user = req.session.user;
    const product = req.body;
    if(product.categoryid != "" && product.productTitle != ""){
      const productData = [user.id,product.categoryid, product.productTitle, product.productDescription];
      try {
        await connection.query('INSERT INTO products(userid,categoryid,productTitle,productDescription) values(?)',[productData]);
        console.log(rows);
        return res.status(200).json({message: 'Item Added'});
      } catch (error) {
        console.log(error);
        return httpMessage.serverError(res);
      }
    }else{
      return res.status(400).json({message: 'Category and title should not be empty'});
    }
  } else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

async function expectedCategoryList(req,res){
  if(req.session.user){
    const userId = req.session.user.id;

    try {
      //load all expected category name of current user 
      const [result] = await connection.query('SELECT expectedproduct.id,categoryname FROM category INNER JOIN expectedproduct ON expectedproduct.categoryid = category.id WHERE expectedproduct.userid = ?',userId);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return httpMessage.serverError(res);
    }

  }else{
    return httpMessage.notLoggedInError(res);
  }
}

//-------------------------------------------------Match User--------------------------------
async function matchUser(req,res){
  if(req.session.user){
    const user = req.session.user;
    const userId = user.id;
    const userIdWithExpectedProduct = [];
    const userArray = [];
    const [expectedCategoryId] = await connection.query('SELECT categoryid FROM expectedproduct WHERE userid = ?',userId);
    const [userOwnedCategoryId] = await connection.query('SELECT DISTINCT categoryid FROM products WHERE userid = ?',userId);
    
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
    outerloop:
    for (const x of userIdWithExpectedProduct) {
      const [expCatId] = await connection.query('SELECT categoryid FROM expectedproduct WHERE userid = ?', [x]);
    
      for (const matchingUsercatId of expCatId) {
        for (const userCatId of userOwnedCategoryId) {
          console.log(userCatId.categoryid, matchingUsercatId.categoryid);

          if (userCatId.categoryid === matchingUsercatId.categoryid) {
            console.log(x);
            
            const [expUser] = await connection.query('SELECT * FROM users WHERE users.id = ?', [x]);
            
            if (userId != expUser[0].id) {
              userArray.push(expUser[0]);
            }
            continue outerloop;
          }
        }
      }
    }
  
    return res.status(200).json(userArray);
  }else{
    return res.status(400).json({message: 'Not logged in'});
  }
}
//------------------------------------------------------------------------------------



async function getCategory(req,res){
  try {
    [rows] = await connection.query('SELECT * FROM category order by categoryname');
    console.log(rows);
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return httpMessage.serverError(res);
  }
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

async function addExpectedProduct(req,res){
  if(req.session.user){
    const user = req.session.user;
    const product = req.body;
    if(product.categoryid != ""){
      const productData = [user.id,product.categoryid];
      try {
        await connection.query('INSERT INTO expectedproduct(userid,categoryid) values(?)',[productData]);
        console.log(rows);
        return res.status(200).json({message: 'Item Added'});
      } catch (error) {
          console.log(error);
          if(error.code == "ER_DUP_ENTRY"){
            return res.status(400).json({message: 'category already exists'});
          }else{
            return httpMessage.serverError(res);
          }
      }
    }else{
      return res.status(400).json({message: 'Category not choosen'});
    }
  } else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

async function deleteExpectedProduct(req,res){
  if(req.session.user){
    try {
      const expectedProductId = req.body.id;
      await connection.query('DELETE FROM expectedproduct WHERE id = ?',expectedProductId);
      return httpMessage.success(res);
    } catch (error) {
      console.log(error);
      return httpMessage.serverError(res);
    }
  }else{
    return httpMessage.notLoggedInError(res);
  }
}

module.exports = {
  productsList,
  addProduct,
  getCategory,
  addExpectedProduct,
  getExpectedProductList,
  matchUser,
  allProductList,
  expectedProductList,
  expectedCategoryList,
  deleteExpectedProduct,
  getProduct
};
