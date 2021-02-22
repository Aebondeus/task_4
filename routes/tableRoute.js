import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.put("/api/table/changest", async (req, res) => {
  try {
    console.log(typeof req.body);
    const { status, id } = req.body;
    console.log(id);
    if (id.length >= 1) {
      id.forEach((userId) => {
        User.findById(userId, (err, user) => {
          user.blocked = status;
          user.save();
        });
      });
    }
    res.status(200).json({ msg: "Data was modified" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Something wrong with PUT method" });
  }
});

router.delete("/api/table/changest/", async (req, res) => {
  try {
    const { id } = req.body;
    if (id.length >= 1) {
      id.forEach((userId) => {
        User.findByIdAndDelete(id, (err, user) => {
          console.log("User deleted");
        });
      });
    }
    return res.status(200).json({ msg: "Data was modified" });
  } catch (err) {
    console.log(e);
    return res.status(500).json({ msg: "Something wrong with DELETE method" });
  }
});

router.put("/api/table", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    if (!!!id) {
      return res.status(200).json({ blocked: false });
    }
    User.findById(id, (err, user) => {
      try {
        return res.status(200).json({ blocked: user.blocked });
      } catch (e) {
        return res.status(200).json({ blocked: true });
      }
    });
  } catch (err) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Something wrong with PUT method on /table" });
  }
});

router.get("/api/table", async (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (err) {
        throw Error("Error when trying to get response");
      }
      let userData = [];
      users.forEach((user, id) => {
        userData.push({
          id: user._id,
          login: user.login,
          email: user.email,
          regData: user.regData,
          lastLogin: user.lastLogin,
          blocked: user.blocked,
        });
      });
      res.status(200).json(userData);
    });
  } catch (e) {
    console.log("Error here");
    return res.status(500).json({ msg: "Server Error" });
  }
});

export const tableRouter = router;
