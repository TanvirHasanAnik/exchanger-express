const notLoggedIn = res.status(400).json({message: 'Not logged in'});
const serverError = res.status(500).json({message: 'Internal Server Error: Unable to retrieve product list.' });

module.exports = {notLoggedIn,serverError};