import { Router } from "express";
import { createUrlShorten, getUrlById, openUrlShort } from "../controllers/urlsControllers.js";
import tokenValidation from "../middlewares/TokenValidation.js"


const router = Router()


router.post("/urls/shorten",tokenValidation,createUrlShorten) 
router.get("/urls/:id", getUrlById)
router.get("/urls/open/:shortUrl", openUrlShort)

export default router