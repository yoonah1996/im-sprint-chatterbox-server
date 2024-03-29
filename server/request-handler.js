/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

**************************************************************/

// server
//     ✓ should respond to GET requests for /classes/messages with 
// a 200 status code (54ms)
//     ✕ should send back parsable stringified JSON (15ms)
//     ✕ should send back an object (17ms)
//     ✕ should send an object containing a `results` array (14ms)
//     ✕ should accept POST requests to /classes/messages (13ms)
//     ✕ should response with messages that were previously posted 
// (43ms)
//     ✕ Should 404 when asked for a nonexistent endpoint (6ms)


const result = [{id:0,username:'codestates',text:'hello world', roomname : "codestates"} ];

const requestHandler = function (request, response) {
  // node server 의 requestHandler는 항상 request, response를 인자로 받습니다.
  // let headers = defaultCorsHeader;
  // 응답을 위한 status 코드입니다.
  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  // CORS에 대해서는 조금더 알아보세요.
  const statusCode = 200;
  const headers = defaultCorsHeaders;
  headers["Content-Type"] = "text/plain";
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.

  if (request.method === 'OPTIONS' && request.url === "/classes/messages") {

    response.writeHead(200, headers);
    response.end("this is options");
  }else if (request.method === 'POST' && request.url === "/classes/messages") {
    let body = [];
    request
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {

        body = JSON.parse(Buffer.concat(body).toString());
        body.id = result.length
        result.unshift(body)
        console.log(result)
        response.writeHead(201, headers);
        response.end(JSON.stringify(result))

      })
  } else if (request.method === 'GET' && request.url === "/classes/messages") {
    console.log(JSON.stringify(result))
    response.writeHead(statusCode, headers)
    response.end(JSON.stringify(result))
    
  }
  else {
    response.writeHead(404, headers);
    response.end("this is error 404");
  }
}


// 또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.
//
// 이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.
//
// 기본적인 로그를 작성 하세요
//
// 간단한 로그를 작성 하는 것은, 서버를 디버깅 하는데 매우 수월하게 해줍니다.
// 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.


// .writeHead() 메소드는 응답 헤더에 해당 key, value 를 적어줍니다.
// console.log(
  //   "Serving request type " + request.method + " for url " + request.url
  // );
  // response.writeHead(statusCode, headers);

  // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
  // response.end("Hello, World!");


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;