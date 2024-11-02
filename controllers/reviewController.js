var connection = require('../connection');
var httpMessage = require('../httpMessage');

async function addReview(req, res) {
if(req.session.user){
    try {
        const userid = req.body.userid;
        const reviewerid = req.session.user.id;
        const content = req.body.content;
        const body = [userid,reviewerid,content];

        await connection.query('INSERT INTO review(userid,reviewerid,content) values(?)',[body]);
        return httpMessage.success(res);
    } catch (error) {
        console.log(error);
        return httpMessage.serverError(res);
    }
}else{
    return httpMessage.notLoggedIn(res);
 }
}

async function getReview(req, res) {
  
}

module.exports = {addReview,getReview};