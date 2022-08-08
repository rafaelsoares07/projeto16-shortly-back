import connection from "../database/postgres.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


import signupSchema from "../schemas /signupShema.js";
import signinSchema from "../schemas /signinSchema.js";


export async function signupNewUser(req, res){
    const newUser = req.body

    const validateNewUser = signupSchema.validate(newUser)

    if(validateNewUser.error){
        console.log(validateNewUser.error.details) 
        res.status(422).send('erro no body da request')
        return
    }

    const userExist = await connection.query(
        `SELECT * FROM users WHERE users.email=$1`,
        [newUser.email]
    )

    if(userExist.rowCount>0){
        res.status(409).send('Usuario ja existe ')
        return
    }

    const passwordHash = bcrypt.hashSync(newUser.password, 10)

    await connection.query(
        `INSERT INTO users (name, email, password) 
         VALUES ($1,$2,$3)`,
         [newUser.name, newUser.email,passwordHash]
         )
    
    res.status(201).send('novo cadastro feito com sucesso')
}

export async function loginUser(req,res){

    const userLogin = req.body
        
    const userLoginValid = signinSchema.validate(userLogin)

    if(userLoginValid.error){
        res.status(422).send('erro no body')
        return
    }

    const {rows:userExist} = await connection.query(
        `SELECT * FROM users WHERE users.email=$1`,
        [userLogin.email]
    )

    console.log(userExist)

    if(userExist.length===0){
        res.status(401).send('usuario nao existe')
        return
    }

    const validPassword = bcrypt.compareSync(userLogin.password,userExist[0].password)
    
    if(!validPassword){
        res.status(401).send('usuario existe mas senha nao confere')
        return
    }


    const token = jwt.sign(userExist[0].id, process.env.KEYSECRET)

    res.status(200).send({token, userLogin})
}