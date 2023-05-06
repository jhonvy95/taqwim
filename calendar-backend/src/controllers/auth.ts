import { RequestHandler, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/jwt";
import { IGetUserAuthInfoRequest } from "../@types/types";

export const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }
    const newUser = new User(req.body);

    //  encrypt password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    //  generate JWT
    const token = await generateJWT(newUser.id, newUser.name);

    res.status(201).json({ ok: true, uid: newUser.id, name: newUser.name, token });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User does not exist",
      });
    }

    //  confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    //  generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export const revalidateToken = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { uid, name } = req;

  // generate a new JWT and return it in the response
  const token = await generateJWT(uid as string, name as string);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};
