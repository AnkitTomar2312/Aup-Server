const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  const { name, email, password, about } = req.body;
  const hashedPassword=await bcrypt.hashSync(password,10)
  const user=await userModel.create({
    name,email,password:hashedPassword,about
  })
  if(user){
    res.status(200).json({user_id:user.id})
  }else{
    res.status(400).json({message:"user not registered"})
    throw new Error("user not registered")
  }}

  module.exports = {
    createUser,
   
  };
  