var connection = require('../connection');

function getProfile(req,res){
  const user = req.session.user;
  connection.query('SELECT username,address,email,phone FROM users where id = ?',user.id,(err,rows)=>{
      if(err){
          console.log(err);
          return res.status(err.status).json({message: err.message});
      }else{
          console.log(rows);
          return res.status(200).json(rows);
      }
  })
}

function register(req,res){
    console.log(req.body);
    const body = req.body;
    const bodyData = [body.username,body.password, body.address, body.email, body.phone]
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

function login(req, res) {
    console.log(req.body)
    const body = req.body;
    if(!body.username){
      return res.status(400).json({message: 'username is required'});
    }
    if(!body.password){
      return res.status(400).json({message: 'password is required'});
    }
    var queriedpass = "";
    connection.query('SELECT id,password FROM users WHERE username=?',body.username,(err,rows)=>{
      if(err){
          console.log(err);
      }else{
          if(rows[0] == null){
              console.log("username does not exist");
              return res.status(400).json({message: 'username does not exist'});
          }else{
              console.log(rows);
              queriedpass = rows[0].password;
              queriedid = rows[0].id;
              console.log(queriedpass);
              if(body.password == queriedpass){
                console.log("login successful");
                req.session.user = {id:queriedid, username:body.username}
                console.log(req.session);
                res.status(200).json({message: 'login successful'});
              } else {
                return res.status(400).json({message: 'Username or password not correct'});
              }
          }
      }
  })
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