import express from "express";
import bcrypt from 'bcrypt';
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {config} from '../config/config.js'
const router = express.Router();

router.use(
  "/register",
  [
    check("login", "Login is missed").isLength(1),
    check("password", "Password is missed").exists(),
    check("email", "Email is missed").isEmail(),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res
          .status(400)
          .json({ msg: "Wrong input", errors: errors.array() });
      }
      const { login, password, email } = req.body;
      const isExist = await User.findOne({ email }).exec();
      console.log(isExist);
      if (!!isExist) {
        return res.status(403).json({ msg: "User already exist" });
      }
      const regDate = new Date();
      const hash = bcrypt.hashSync(password, config.salt)
      console.log(hash)
      const newUser = new User({
        login: login,
        password: hash,
        email: email,
        regData: `${regDate.toISOString()}`,
        lastLogin: "",
        blocked: false,
      });
      newUser.save();
      console.log("New user saved!");
      return res.status(200).json({ msg: "New user was added" });
    } catch (err) {
      console.log("Server Error");
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

router.use(
  "/login",
  [
    check("login", "Login is missed").exists(),
    check("password", "Password is missed").exists().isLength(1),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Wrong input", errors: errors.array });
    }
    try {
      console.log(req.body);
      const { login, password } = req.body;
      console.log(login);
      await User.findOne({ login: login }, (err, user) => {
        if (err) {
          console.log('Here')
          console.log(err)
        }
        if (!!!user){
          return res.status(401).json({ msg: "Wrong email/password" });
        }
        const pass = bcrypt.compareSync(password, user.password);
        if (!pass){
          return res.status(402).json({ msg: "Wrong password" });
        }
        if (user.blocked){
          return res.status(403).json({ msg: "You've been banned" });
        }
        const token = jwt.sign(
          {userLogin:login},
          config.forToken,
          {expiresIn:'1h'}
        );
        const logTime = new Date();
        const userId = user._id;
        user.lastLogin = `${logTime.toISOString()}`;
        user.save();
        return res.status(200).json({ msg: "User is authorized", token, id:userId});
      })
    } catch (err) {
      console.log(err)
      console.log("Error here. Server error");
      res.status(500).json({ msg: `Server error ${err}` });
    }
  }
);

export const authRouter = router;