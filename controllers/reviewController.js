var connection = require('../connection');
var httpMessage = require('../httpMessage');
const vader = require('vader-sentiment');

async function addReview(req, res) {
if(req.session.user){
    try {
        const userid = req.body.userid;
        const reviewerid = req.session.user.id;
        const content = req.body.content;
        var positive = true;
        function analyzeSentiment(text) {
            const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
            return intensity;
        }
        
        const result = analyzeSentiment(content);
        console.log('Sentiment Analysis Result:', result);
        if(result.compound < -0.05){
            positive = false;
        }
        const body = [userid,reviewerid,content,positive];

        await connection.query('INSERT INTO review(userid,reviewerid,content,positive) values(?)',[body]);
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

async function sentiment () {
    function analyzeSentiment(text) {
        const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
        return intensity;
    }
    
    // Example usage
    const textToAnalyze = "The user was very friendly but his product was defective";
    const result = analyzeSentiment(textToAnalyze);
    console.log('Sentiment Analysis Result:', result);
}

module.exports = {addReview,getReview,sentiment};