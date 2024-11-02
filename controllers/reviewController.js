var connection = require('../connection');
var errorMessage = require('../errorMessages');
async function addReview(req, res) {

if(req.session.user){
    try {
        const userid = req.body.userid;
        const reviewerid = req.session.user.id;
        const content = req.body.content;
        const body = [userid,reviewerid,content];

        await connection.query('INSERT INTO review(userid,reviewerid,content) values(?)',[body]);
    } catch (error) {
        console.log(error);
        return errorMessage.serverError;
    }
}else{
    return errorMessage.notLoggedIn;
 }
}

async function getReview(req, res) {
  
}

module.exports = {addReview,getReview};