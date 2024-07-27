var express = require('express')
var cors = require('cors');
var userRouter = require('./routers/userRouter');

var app = express()

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/user',userRouter);

app.listen(3000, ()=> {
    console.log('Listening on port 3000');
});