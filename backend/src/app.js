const express = require('express');
const app = express();
const { connectdb } = require('./config/database');
const authRouter = require('./routes/authRoute');
const requestRouter = require('./routes/requestRoute');
const userRouter = require('./routes/userRoute');
const user = require('./models/user');
// Route Handlers

// app.use('/', (req, res,next) => {
//     next();
//     res.send('Hello');
// })

app.use('/', authRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectdb().then(()=> {
    console.log('connected to database successfully');
    app.listen(7777, (req, res) => {
        console.log('server is running on port 7777');
    })
}).catch((err) => {
    console.log(err, ' error!')
});
