const express = require('express')
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const userProductRouter = require('./routers/userProductRouter');
const reviwRouter = require('./routers/reviewRouter');
const session = require('express-session');
const store = new session.MemoryStore();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['http://localhost']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(session({
    secret: "exchanger",
    saveUninitialized: false,
    resave:false,
    store: store,
    cookie: {httpOnly: true, secure: false, maxAge: null },
}));

app.use('/user',userRouter);
app.use('/user-products', userProductRouter);
app.use('/review',reviwRouter);
app.listen(3000, ()=> {
    console.log('Listening on port 3000');
});