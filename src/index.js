import express from "express"
import connect from "./db/dbConnection.js"
import bodyParser from "body-parser"
import cors from "cors"
import ExcuteRoute from "./routes/index.js"

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

ExcuteRoute(app)

connect()

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
