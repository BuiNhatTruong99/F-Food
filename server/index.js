const dotenv = require("dotenv");

const express = require("express");
const db = require("./src/config/dbConnect");
const route = require("./src/routes");
const cookie = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6666;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect();
route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
