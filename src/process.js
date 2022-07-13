const dotenv = require("dotenv")
dotenv.config()

console.log(process.pid)
console.log(process.execPath)
console.log(process.cwd())
console.log(process.env.USERDOMAIN)
console.log(process.env.USERNAME)
console.log(process.env.USERPROFILE)
console.log(process.env.SECRET_KEY)
console.log(process.env.PORT, typeof process.env.PORT)

const PORT = parseInt(process.env.PORT)

console.log(PORT, typeof PORT)