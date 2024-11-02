var connection = require('../connection');

async function getProfile(req,res){
  if(req.session.user){
    try {
      const reqUser = req.query.userid;
      const loggedUser = req.session.user.id;
      const user = reqUser;
      console.log(req.query);
      const [rows] = await connection.query('SELECT username,address,email,phone FROM users where id = ?',user);
      console.log(rows[0]);
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({message: 'Server error'});
    }
  }else{
    return res.status(400).json({message: 'Not logged in'});
  }
}

function register(req,res){
    console.log(req.body);
    const body = req.body;
    const bodyData = [body.username,body.password, body.address, body.email, body.phone];
    if(!body.username || !body.password || !body.address){
      return res.status(400).json({message: 'All required fields are not filled'});
    }
    if (body.email != "") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      isEmailValid = emailPattern.test(body.email);
      if(isEmailValid == false){
        return res.status(400).json({message: 'Invalid email pattern'});
      }
    } 
    if (body.phone != "") {
      const phonePattern = /(01)[3-9]{1}\d{8}/;
      isPhoneValid = phonePattern.test(body.phone);
      if(isPhoneValid == false){
        return res.status(400).json({message: 'Invalid Bangladeshi phone number'});
      }
    } 
    connection.query('INSERT INTO users(username,password,address,email,phone) values(?)',[bodyData],(err,rows)=>{
      if(err){
          console.log(err);
          if(err.code == "ER_DUP_ENTRY"){
            return res.status(400).json({message: 'username already exists'});
          }
      }else{
        console.log("register successful");
        return res.status(200).json({message: 'register successful'});
      }
  })
}

async function login(req, res) {
    console.log(req.body)
    const body = req.body;
    if(!body.username){
      return res.status(400).json({message: 'username is required'});
    }
    if(!body.password){
      return res.status(400).json({message: 'password is required'});
    }
    var queriedpass = "";
    const [result] = await connection.query('SELECT id,password FROM users WHERE username=?',body.username);
    if(result[0] == null){
        console.log("username does not exist");
        return res.status(400).json({message: 'username does not exist'});
    }else{
        console.log(result);
        queriedpass = result[0].password;
        queriedid = result[0].id;
        //console.log(queriedpass);
        if(body.password == queriedpass){
          console.log("login successful");
          req.session.user = {id:queriedid, username:body.username}
          console.log(req.session);
          res.status(200).json({message: 'login successful'});
        } else {
          res.status(400).json({message: 'Username or password not correct'});
        }
    }
  }

  function logout(req, res){
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error logging out');
            } else {
                console.log('logged out');
                res.status(200).send('Logged out');
            }
        });
    };

  module.exports = {getProfile,register,login,logout};