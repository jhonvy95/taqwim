import { RequestHandler, Response } from "express";
import { IGetUserAuthInfoRequest } from "../@types/types";
import Event from "../models/Event";

// Get all events
export const getEvents: RequestHandler = async (_req, res) => {
  const events = await Event.find().populate("user", "name");
  res.status(200).json({
    ok: true,
    events,
  });
};

// Create a new event
export const createEvent = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventSave = await event.save();

    res.status(201).json({
      ok: true,
      event: eventSave,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Update an event
export const updateEvent = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.status(200).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Delete an event

export const deleteEvent = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    await Event.findByIdAndDelete(eventId);
    res.status(200).json({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};
