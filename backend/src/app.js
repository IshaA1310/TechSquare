const express = require('express');
const app = express();

// Route Handlers
app.use('/test', (req, res) => {
    res.send('Hey Test')
})

app.use('/', (req, res) => {
    res.send('Hello')
})

app.listen(7777, (req, res) => {
    console.log('server is running on port 7777');
})