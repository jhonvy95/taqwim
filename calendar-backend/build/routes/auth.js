"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const fieldValidators_1 = require("../middlewares/fieldValidators");
const validate_jwt_1 = require("../middlewares/validate-jwt");
// Routes of users /Auth
// host + /api/auth
const router = express_1.default.Router();
router.post("/new", [
    // middlewares
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").isLength({ min: 6 }),
    fieldValidators_1.validateFields,
], auth_1.createUser);
router.post("/", [
    // middlewares
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password is required").isLength({ min: 6 }),
    fieldValidators_1.validateFields,
], auth_1.loginUser);
router.get("/renew", validate_jwt_1.validateJWT, auth_1.revalidateToken);
exports.default = router;
