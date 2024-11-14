var connection = require('../connection');
var httpMessage = require('../httpMessage');


const { exec } = require('child_process');

function analyzeSentiment(text) {
    return new Promise((resolve, reject) => {
        exec(`python analyze.py "${text}"`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            } else if (stderr) {
                reject(`stderr: ${stderr}`);
            } else {
                resolve(JSON.parse(stdout));
            }
        });
    });
}


async function addReview(req, res) {
if(req.session.user){
    try {
        const userid = req.body.userid;
        const reviewerid = req.session.user.id;
        const content = req.body.content;
        var positive = true;
        
        const result = await analyzeSentiment(content);
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
        const [reviews] = await connection.query('SELECT username,content FROM review INNER JOIN users ON review.reviewerid = users.id WHERE review.userid = ?  ORDER BY review.id DESC',userid);
        return res.status(200).json(reviews);
    } catch (error) {
        return httpMessage.serverError(res);
    }
    
}

async function getReviewCounts(req, res) {
    
    var counts = {};
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
        const [[{total}]] = await connection.query('SELECT COUNT(id) AS total FROM review  WHERE review.userid = ?',userid);
        const [[{positive}]] = await connection.query('SELECT SUM(positive) AS positive FROM review  WHERE review.userid = ?',userid);
        const negative = total - positive;

        console.log(total);
        console.log(positive);
        console.log(negative);
        
        counts.total = (total != null) ? total : 0;
        counts.positive = (positive != null) ? positive : 0;
        counts.negative = (negative != null) ? negative : 0;
        console.log(counts);
        return res.status(200).json(counts);
    } catch (error) {
        return httpMessage.serverError(res);
    }
    
}

async function sentiment (req,res) {
    const text = req.body.text;
    const result = await analyzeSentiment(text);
    console.log('Sentiment Analysis Result:', result);
    return res.status(200).json(result);
}

module.exports = {addReview,getReview,getReviewCounts,sentiment};