import express from "express";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/events";
import { validateJWT } from "../middlewares/validate-jwt";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fieldValidators";
import isDate from "../helpers/isDate";
//host + /api/events

const router = express.Router();

// All routes need JWT validation
router.use(validateJWT);

// Get all events
router.get("/", getEvents);

// Create a new event
router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

// Update an event
router.put(
  "/:id",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

// Delete an event
router.delete("/:id", deleteEvent);

export default router;
