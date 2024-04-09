// const users = require("../data/users");
const userModel = require("../modles/user.model");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  const { name, email, password, about } = req.body;
  const user = new userModel({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    about,
  });
  user
    .save()
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "User not created" });
      }
      res.status(200).send({ message: "user registered successfully" });
    })
    .catch((e) => {
      res.send({ message: e.message || "Some Error occured" });
    });
};



module.exports = {
  createUser,
  
};
