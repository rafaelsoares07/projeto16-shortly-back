import { Router } from "express";
import { loginUser, signupNewUser } from "../controllers/authController.js";



const router = Router()


router.post("/signup",signupNewUser)
router.post("/signin", loginUser)


export default router