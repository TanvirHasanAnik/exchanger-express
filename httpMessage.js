const notLoggedInError = (res) => res.status(400).json({message: 'Not logged in'});
const serverError = (res) => res.status(500).json({message: 'Internal Server Error: Unable to retrieve product list.'});
const success = (res) => res.status(200).json({message: 'Successful'});
module.exports = {notLoggedInError,serverError,success};