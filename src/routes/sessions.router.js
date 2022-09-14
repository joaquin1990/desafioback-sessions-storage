import { Router } from "express";
import usersService from "../models/Users.js";

// Not using at the momento, the teacher is going to explain how to dehash.
// import { createHash } from '../utils.js'

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .send({ status: "error", message: "Incomplete form fields" });
  const exists = await usersService.findOne({ email: email }); // Este es el campo unico que estoy solicitando.
  // Is the user already in the database?
  if (exists)
    return res
      .status(400)
      .send({ status: "error", message: "User already exists" });
  // Once we know the user is in out database, we insert it:
  const newUser = {
    name,
    email,
    //createHash(password)
    password: password,
  };
  let result = await usersService.create(newUser);
  res.send({
    status: "success",
    message: "User succesfuly created. Please proceed to login.",
    result: result,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", message: "email and password are required" });
  // Verify if the user exists with that user and pasword in the database:
  const user = await usersService.findOne({ email: email });
  if (!user)
    return res.status(400).send({
      status: "error",
      message: `User identified as ${email} does not exist`,
    });
  if (user.password != password)
    return res
      .status(400)
      .send({ status: "error", message: "Incorrect password" });
  req.session.user = {
    // Create in the session cookie a user (this one must not carry important information)
    email,
    role: "user",
  };
  res.send({
    status: "success",
    message: `Welcome ${email}, you are now logged in.`,
  });
});

router.get("/current", (req, res) => {
  if (!req.session.user) {
    // If the user exists, is because it already has gone through login process:
    return res.status(400).send({
      status: "error",
      message: "No current active sessions, please log in",
    });
  }
  res.send({
    status: "success",
    message: `Welcome user ${req.session.user.email}, you still have an ongoing session`,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.status(500).send({
        status: "error",
        message: "Could not logout, please try again",
      });
  });
  res.send({ status: "success", message: "Logged out!" });
});

export default router;
