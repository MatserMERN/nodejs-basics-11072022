const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const users = require("./user.json")

app.get("/", function (request, response) {
    response.send("Welcome to Express API")
})

app.get("/user", (request, response) => {
    response.json(users)
})

app.get("/employee", (request, response) => {
    var employee = {
        "id": 1,
        "name": "Scott Desatnick",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    }
    response.json(employee)
})

app.get("*", (request, response) => {
    response.json("Please contact administartor")
})
const PORT = parseInt(process.env.PORT)

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT} `)
})