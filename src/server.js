import express  from "express";
import cors from "cors"
import connection from "./database/postgres.js"
import router from "./routes/index.js"

// console.log('servidor rodou')


const server = express()
server.use(cors())
server.use(express.json())


server.use(router)





server.listen(process.env.PORT, ()=>{
    console.log('Rodando na porta: ' + process.env.PORT)
})