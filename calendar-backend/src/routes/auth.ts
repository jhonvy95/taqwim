import express from "express";
import { createUser, loginUser, revalidateToken } from "../controllers/auth";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fieldValidators";
import { validateJWT } from "../middlewares/validate-jwt";
// Routes of users /Auth
// host + /api/auth

const router = express.Router();

router.post(
  "/new",
  [
    // middlewares
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    // middlewares
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);

export default router;
