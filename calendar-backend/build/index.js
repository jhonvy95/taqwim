"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const events_1 = __importDefault(require("./routes/events"));
const config_1 = require("./database/config");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// database connection
(0, config_1.dbConnection)();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
// CORS
app.use((0, cors_1.default)());
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/events", events_1.default);
