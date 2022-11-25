//for env file
require("dotenv").config();
global.environment = process.env.NODE_ENV;
const express = require("express");
const cors = require("cors");
const departmentRoute = require("./Routes/department.routes");
const connectToDatabase = require("./Utils/utils");
const app = express();
connectToDatabase();

app.use(
  cors({
    origin: environment === "dev" ? "*" : "https://dev-exam.onrender.com",
  })
);

app.use(express.json());
app.use("/api", departmentRoute);
app.get("/", (req, res) => {
  res.send("server is working fine");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
