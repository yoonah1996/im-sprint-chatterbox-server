const express = require('express')
const app = express()
// const router = express.Router()
const PORT = 3000 
const cors = require('cors')

var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
// process.env.NODE_ENV === 'production' ? 3001: 3002 
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
  }
const messages = [{username: '박윤아', text: '끝입니다 페어', roomname: 'undefined', id:0}];
app.use(bodyParser.json()) //앞으로  bodyparser에 들어오는 정보는 json타입이다!
app.use(cors(headers))  //cors사용할거야

app.get('/classes/messages', (req, res) => {
  console.log(JSON.stringify(messages))
  res.send(JSON.stringify(messages))})
app.post('/classes/messages', jsonParser, function (req, res) {
    // create user in req.body
    req.body.id = messages.length
     messages.unshift(req.body)
     console.log(messages)
     res.send(JSON.stringify(messages))

  })
// app.post('/classes/messages',  function (req, res) {

//     messages.push(req.body)
//     res.send(messages)
//     // create user in req.body
//     console.log(messages)
//   })

app.listen(PORT,()=>{
   console.log(`server listen on ${PORT}`)
})