const express = require('express')
const app = express()
// const router = express.Router()
const PORT = 3000 
const cors = require('cors')

var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
// process.env.NODE_ENV === 'production' ? 3001: 3002 
const headers = {
    // "origin": "*",
    // "methods": "GET, POST, PUT, DELETE, OPTIONS",
    // "preflightContinue": false,
    // "optionsSuccessStatus": 204,
    // "allowedHeaders": "content-type, accept",
    // "maxAge" : 10
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
  }
const messages = [{username: '박윤아', text: '끝입니다 페어', roomname: 'undefined'}];
app.use(bodyParser.json()) //앞으로  bodyparser에 들어오는 정보는 json타입이다!
app.use(cors(headers))  //cors사용할거야

 
// app.use((req,res,next)=>{
//     // 헤더에 토큰 가져왔니? 아니면 돌아가!
//     if(req.headers.token){
//         console.log("hihihihihihi",req.headers.token)
//         req.user = true;
//         next()
//     } else {
//         res.status(400).send('invalid user')
//     }
// })


app.get('/classes/messages', (req, res) => res.send(JSON.stringify(messages)))
app.post('/classes/messages', jsonParser, function (req, res) {
    // create user in req.body
    req.body.id = messages.length
     messages.push(req.body)
     res.send(JSON.stringify(messages))
     console.log(messages)

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