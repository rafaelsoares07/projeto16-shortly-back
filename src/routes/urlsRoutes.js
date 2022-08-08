import { Router } from "express";
import { createUrlShorten, deleteUrlShort, getMyUrlsShorten, getUrlById, openUrlShort, getRanking } from "../controllers/urlsControllers.js";
import tokenValidation from "../middlewares/TokenValidation.js"


const router = Router()


router.post("/urls/shorten",tokenValidation,createUrlShorten) 
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", openUrlShort)
router.delete("/urls/:id",tokenValidation, deleteUrlShort)
router.get("/users/me",tokenValidation,getMyUrlsShorten)
router.get("/ranking",getRanking)

export default router