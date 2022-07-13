const http = require("http")

http.createServer(function(request, response){
    console.log(request.url)
    console.log(request.headers.referer)

    if(request.url === '/'){
        response.end("Welcome to NodeJS Server")
    } else if(request.url === '/user'){
        response.end("Here are the user details")
    }else if(request.url === '/employee'){
        response.end("Here are the employee details")
    } else {
        response.end("Please contact administrator")
    }
}).listen(3001)

