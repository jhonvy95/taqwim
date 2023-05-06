"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const events_1 = require("../controllers/events");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const express_validator_1 = require("express-validator");
const fieldValidators_1 = require("../middlewares/fieldValidators");
const isDate_1 = __importDefault(require("../helpers/isDate"));
//host + /api/events
const router = express_1.default.Router();
// All routes need JWT validation
router.use(validate_jwt_1.validateJWT);
// Get all events
router.get("/", events_1.getEvents);
// Create a new event
router.post("/", [
    (0, express_validator_1.check)("title", "title is required").not().isEmpty(),
    (0, express_validator_1.check)("start", "start date is required").custom(isDate_1.default),
    (0, express_validator_1.check)("end", "end date is required").custom(isDate_1.default),
    fieldValidators_1.validateFields,
], events_1.createEvent);
// Update an event
router.put("/:id", [
    (0, express_validator_1.check)("title", "title is required").not().isEmpty(),
    (0, express_validator_1.check)("start", "start date is required").custom(isDate_1.default),
    (0, express_validator_1.check)("end", "end date is required").custom(isDate_1.default),
    fieldValidators_1.validateFields,
], events_1.updateEvent);
// Delete an event
router.delete("/:id", events_1.deleteEvent);
exports.default = router;
