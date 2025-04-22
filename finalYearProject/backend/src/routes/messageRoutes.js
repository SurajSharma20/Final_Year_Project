const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageControllers");
const auth = require("../middleware/middlewareAuth");

router.get("/getMessages", auth, messageController.getMessages);
router.post("/sendMessages", auth, messageController.sendMessage);

module.exports = router;
