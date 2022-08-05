import { Router } from "express";

import authRouter from "./authRoutes.js"
import urlsRoutes from "./urlsRoutes.js"


const router = Router()

router.use(authRouter)
router.use(urlsRoutes)


export default router