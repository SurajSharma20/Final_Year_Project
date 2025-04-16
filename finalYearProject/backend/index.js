const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("../backend/src/config/db");
const cors = require("cors");
const socketIO = require("socket.io");
const userRoutes = require("./src/routes/authRoutes");

var corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://13.233.18.35", "http://extension.optiinvest.in", "https://extension.optiinvest.in"],
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json()); // ✅ fixed
app.use(express.urlencoded({ extended: false }));


app.use("/api", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
