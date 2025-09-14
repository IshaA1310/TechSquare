const express = require('express');
const app = express();
// handle multiple routes 

app.use('/', (req, res, next) => {
  next();
})

// app.use('/he?y', (req, res) => {
//   res.send('i am he?y');
// })

app.use('/user', (req, res, next) => {
  console.log(req.query.id, 'query iddd');
  if(req.query.id)res.send(`user query ${req.query.id} query Id`);
  next();
})

app.use('/user/:id', (req, res) => {
  console.log(req.params.id, 'params iddd');
  res.send(`user params ${req.params.id} params Id`);
});

// app.use('*', (req, res) => {
//   res.status(401).send('Request not found');
// });

app.listen(7000, (req, res) => {
  console.log('server listening port at at 7000');
});