const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Config = require("./config/config");
const user = require("./models/userModels");
const userRoutes=require("./routes/userRoutes")
const app = express();
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(Config.mongoURI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", userRoutes);

  
  


app.listen(Config.PORT, () => {
  console.log(`Server is running on port ${Config.PORT}`);
});
