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
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvents = void 0;
const Event_1 = __importDefault(require("../models/Event"));
// Get all events
const getEvents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield Event_1.default.find().populate("user", "name");
    res.status(200).json({
        ok: true,
        events,
    });
});
exports.getEvents = getEvents;
// Create a new event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.default(req.body);
    try {
        event.user = req.uid;
        const eventSave = yield event.save();
        res.status(201).json({
            ok: true,
            event: eventSave,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator",
        });
    }
});
exports.createEvent = createEvent;
// Update an event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = yield Event_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }
        const newEvent = Object.assign(Object.assign({}, req.body), { user: uid });
        const eventUpdated = yield Event_1.default.findByIdAndUpdate(eventId, newEvent, { new: true });
        res.status(200).json({
            ok: true,
            event: eventUpdated,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator",
        });
    }
});
exports.updateEvent = updateEvent;
// Delete an event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const event = yield Event_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }
        yield Event_1.default.findByIdAndDelete(eventId);
        res.status(200).json({
            ok: true,
            msg: "Event deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator",
        });
    }
});
exports.deleteEvent = deleteEvent;
