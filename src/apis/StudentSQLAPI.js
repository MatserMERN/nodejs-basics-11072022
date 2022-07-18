import express from "express"
import sql from "mssql"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()
const router = express.Router()

app.use(express.json())
app.use(cors())


const dbConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE =='true'? true:  false  // change to true for local dev / self-signed certs
      }
}

sql.connect(dbConfig, (err) => {
    if(err){
        throw err
    } else {
        console.log(`Connected to SQL Server DB successfully !!!`)
    }
})

router.get("/", (req, res) => {
    res.json("Welcome to Student API using SQLServer DB")
})

router.get("/students", (req, res)=> {
    const request = new sql.Request()
    const selectQuery = "SELECT * FROM student"
    request.query(selectQuery, (err, data) => {
        if(err){
            throw err
        }
        res.json(data.recordset)
    })
})

router.get("/students/:id", (req, res) => {
    const studentId = req.params.id
    const selectQueryById=`SELECT * FROM student WHERE _id = ${studentId}`
    const request = new sql.Request()
    request.query(selectQueryById, (err, data) => {
        if(err){
            throw err
        }
        res.json(data.recordset)
    })
})

router.post("/students", (req, res) => {
    const {name, email, city}=req.body
    const insertQuery=`INSERT INTO student(name, email, city) VALUES ('${name}','${email}', '${city}')`
    const request = new sql.Request()
    request.query(insertQuery, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.put("/students/:id", (req, res) => {
    const studentId = req.params.id
    const {name, email, city} = req.body
    const updateQuery = `UPDATE student  SET name='${name}', email='${email}', city='${city}' WHERE _id=${studentId}`
    const request = new sql.Request()
    request.query(updateQuery, (err, data)=>{
        if(err){
            throw err
        }
        res.json(data)
    })
})

router.delete("/students/:id", (req, res) => {
    const studentId= req.params.id
    const deleteQuery = `DELETE FROM student Where _id=${studentId}`
    const request = new sql.Request()
    request.query(deleteQuery, (err, data) => {
        if(err){
            throw err
        }
        res.json(data)
    })
})

const PORT = process.env.PORT || 3001

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server Listening at PORT ${PORT}`)
})