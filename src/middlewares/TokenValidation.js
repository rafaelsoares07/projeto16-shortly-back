import jwt from "jsonwebtoken";
import connection from "../database/postgres.js";


export default async function tokenValidation(req,res,next){

    try{

    const token = req.headers.authorization?.replace("Bearer ","").trim();
    if(!token){
        res.status(401).send('nao veio token')
        return
    }

    const tokenValid = jwt.verify(token, process.env.KEYSECRET)
    if(!tokenValid){
        
        res.status(401).send('token invalido')
        return
    }

    //console.log(tokenValid)
   res.locals.idUser =  tokenValid
    next()

    }catch(error){
        res.status(401).send('token invalido')
        return
    }
    
}