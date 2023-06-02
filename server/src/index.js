require("dotenv").config();

const express = require("express");

const db = require("./config/dbConnect");
const route = require("./routes");


const app = express();
const PORT = process.env.PORT || 6666;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect();
route(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
