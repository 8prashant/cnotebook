// Basic Express server
const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();//CONNECTING THE DATABASE WITH MONGOOSE

const express = require('express')
const app = express()
const port = 5000

app.use(cors())//Middleware to send and recieve request from front-end to back-end
app.use(express.json());//Middleware to interact with req.body
// avialable
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})