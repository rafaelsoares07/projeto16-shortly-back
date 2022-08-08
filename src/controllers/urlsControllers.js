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

    res.status(200).send('funfou e criou ')
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

export async function openUrlShort(req, res){
    
    const {shortUrl} = req.params

    const {rows:url} = await connection.query(`SELECT url FROM urls WHERE short_url=$1`,[shortUrl])
    
    if(url.length===0){
        res.status(404).send('nao existe essa shorturl')
        return
    }

    await connection.query(`UPDATE urls SET views_cont = views_cont + 1 WHERE short_url=$1`,[shortUrl]) 

    const linkOriginal = url[0].url
    console.log(linkOriginal)

    res.redirect(linkOriginal)
}

export async function deleteUrlShort(req, res){
    const {id} = req.params
    const idUser = res.locals.idUser
    const idNum = Number(idUser)


    const {rows:urlExist} = await connection.query(`SELECT * FROM urls WHERE id=$1`,[id])
    
    if(urlExist.length===0){
        res.status(404).send('id nao existe')
        return
    }

    const idUrl = urlExist[0].user_id

    if(idNum!=idUrl){
        res.status(401).send('existe mas esse usuario nao foi quem criou')
        return
    }

    await connection.query(`DELETE FROM urls WHERE id=$1`,[id])    

    res.status(204).send('url excluida')
}

export async function getMyUrlsShorten(req, res){

    const idUser = res.locals.idUser

    const {rows:userExist} = await connection.query(`SELECT id,name FROM users WHERE id=$1`,[idUser])
    const {rows:urlsUser} = await connection.query(`SELECT * FROM urls WHERE user_id=$1`,[idUser])
    const {rows:visitasTotais} = await  connection.query(`SELECT SUM(views_cont) as "visitCount" FROM urls WHERE user_id=$1`,[idUser])
    
    if(userExist.length===0){
        res.status(404).send('nao tem user')
        return
    }

    const infosUser = {
        id:userExist[0].id,
        name:userExist[0].name,
        visitCount:Number(visitasTotais[0].visitCount),
        shortenedUrls:urlsUser
    }


    res.status(200).send(infosUser)
}