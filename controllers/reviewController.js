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
    
    var userid;
    if(req.query.userid){
        const reqUser = req.query.userid;
        userid = reqUser;
    }
    else if(req.session.user){
        const loggedUser = req.session.user.id;
        userid = loggedUser;
    }else {
        console.log('Please sign in')
        return httpMessage.notLoggedInError(res);
    }

    try {
        const [reviews] = await connection.query('SELECT username,content FROM review INNER JOIN users ON review.reviewerid = users.id WHERE review.userid = ?',userid);
        return res.status(200).json(reviews);
    } catch (error) {
        return httpMessage.serverError(res);
    }
    
}

module.exports = {addReview,getReview};