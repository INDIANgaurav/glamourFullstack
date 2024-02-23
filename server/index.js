const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./connection");
const routes = require("./routes");

connectDb();
app.use(
  cors({
    origin: ["https://glamour-food-app1-9mspkk09k-indiangaurav.vercel.app/"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/" , (req , res ) => {
 res.send("Welcome Gaurav")
})
 

app.listen(port, () => console.log(`Server is running on port ${port}`));