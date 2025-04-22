const Message = require("../models/message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages)
  } catch (error) {
    res.status(404).json({msg:"Not Found"})
    console.log(error.message)
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sender, content } = req.body;
    const message = new Message({ sender, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(404).json({msg:"Not Found"})
  }
};
