"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateToken = exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists",
            });
        }
        const newUser = new user_1.default(req.body);
        //  encrypt password
        const salt = bcryptjs_1.default.genSaltSync();
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        yield newUser.save();
        //  generate JWT
        const token = yield (0, jwt_1.generateJWT)(newUser.id, newUser.name);
        res.status(201).json({ ok: true, uid: newUser.id, name: newUser.name, token });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator",
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User does not exist",
            });
        }
        //  confirm passwords
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid password",
            });
        }
        //  generate JWT
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator",
        });
    }
});
exports.loginUser = loginUser;
const revalidateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name } = req;
    // generate a new JWT and return it in the response
    const token = yield (0, jwt_1.generateJWT)(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token,
    });
});
exports.revalidateToken = revalidateToken;
