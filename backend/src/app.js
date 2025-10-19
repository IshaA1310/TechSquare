const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const { connectdb } = require('./config/database');
const authRouter = require('./routes/authRoute');
const requestRouter = require('./routes/requestRoute');
const userRouter = require('./routes/userRoute');
const profileRouter = require('./routes/profileRoute');
const user = require('./models/user');
const cors = require('cors');
require('dotenv').config();
// Route Handlers

// app.use('/', (req, res,next) => {
//     next();
//     res.send('Hello');
// })

// 🛠️ Trust NGINX as reverse proxy
app.set('trust proxy', true);

app.use(cors({
    origin: 'http://localhost:5173',
    // origin: 'http://16.171.173.170',
    credentials: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/api/test-ip', (req, res) => {
    console.log('Client IP:', req.ip);  // should NOT be 127.0.0.1 now
    res.send(`Your IP is: ${req.ip}`);
});


app.use('/', authRouter);
app.use('/', requestRouter);
app.use('/', userRouter);
app.use('/', profileRouter);

connectdb().then(()=> {
    console.log('connected to database successfully');
    app.listen(process.env.PORT, (req, res) => {
        console.log('server is running on port 7777');
    })
}).catch((err) => {
    console.log(err, ' error!');
});
