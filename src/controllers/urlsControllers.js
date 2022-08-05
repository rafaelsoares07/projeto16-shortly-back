import connection from "../database/postgres.js";
import { nanoid } from "nanoid";

import urlSchema from "../schemas /urlSchema.js";

export async function createUrlShorten(req, res){

    const body = req.body
    const idUser = res.locals.idUser
    const nanoId = nanoid(10)


    const urlValid = urlSchema.validate(body)

    if(urlValid.error){
        //console.log(urlValid.error.details)
        res.status(422).send('url nao ta no formato certo ')
        return
    }

    await connection.query(
        `INSERT INTO urls (user_id, url, short_url) VALUES ($1,$2,$3)`,
        [idUser,body.url,nanoId]
    )

    res.status(200).send('funfou ')
    return
}

export async function getUrlById(req, res){
    
    const {id} = req.params
    

    const {rows:urlExist} = await connection.query(`SELECT id,short_url as "shortUrl",url FROM urls WHERE id = $1`,[id])

    
    if(urlExist.length===0){
        res.status(404).send('url encurtada nao existe')
        return
    }


    res.status(200).send(urlExist)
}