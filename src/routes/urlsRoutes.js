import { Router } from "express";
import { createUrlShorten, getUrlById } from "../controllers/urlsControllers.js";
import tokenValidation from "../middlewares/TokenValidation.js"


const router = Router()


router.post("/urls/shorten",tokenValidation,createUrlShorten) 
router.get("/urls/:id", getUrlById)


export default router