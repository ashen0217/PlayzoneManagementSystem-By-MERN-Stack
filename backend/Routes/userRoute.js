const express = require('express');
const router = express.Router();

//insert model
const User = require("../Model/userModel");

//insert user controller
const userController = require("../Controllers/userControl");


router.get("/",userController.getAllUsers);
router.post("/",userController.addUser);
router.get("/:id",userController.getByID);
router.get("/email/:email",userController.getByEmail);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

module.exports = router;

