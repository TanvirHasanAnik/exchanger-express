var connection = require('../connection');

function register(req,res){
    console.log(req.body);
    const body = req.body;
    const bodyData = [body.username,body.password]
    if(!body.username || !body.password){
      return res.status(400).json({message: 'All fields are not filled'});
    }
    connection.query('INSERT INTO users(username,password) values(?)',[bodyData],(err,rows)=>{
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

  module.exports = {register,login};