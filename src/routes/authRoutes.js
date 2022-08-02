import { Router } from "express";
import { signupNewUser } from "../controllers/authController.js";



const router = Router()


router.post("/signup",signupNewUser)



export default router