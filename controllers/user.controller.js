// const users = require("../data/users");
  const userModel = require("../modles/user.model");
  const bcrypt = require("bcrypt");
  const createUser = async (req, res) => {
    const { name, email, password, } = req.body;
    const hashedPassword=await bcrypt.hashSync(password,10)
    const user=await userModel.create({
      name,email,password:hashedPassword
    })
    if(user){
      res.status(200).json({user_id:user.id})
    }else{
      res.status(400).json({message:"user not registered"})
      throw new Error("user not registered")
    }
  // const user = new userModel({
  //   name,
  //   email,
  //   password: bcrypt.hashSync(password, 10),
  //   about,
  // });
  // user
  //   .save()
  //   .then((data) => {
  //     if (!data) {
  //       res.status(400).send({ message: "User not created" });
  //     }
  //     res.status(200).send({ message: "user registered successfully" });
  //   })
  //   .catch((e) => {
  //     res.send({ message: e.message || "Some Error occured" });
  //   });
};

const getallusers = async (req, res) => {
  userModel
    .find()
    .select("name email updated created")
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No users" });
      }
      res.status(200).send(data);
    });
};

const getuser = async (req, res) => {
  const id = req.params.userid;
  userModel
    .findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "user not found" });
      }
      res.status(200).send(data);
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
};
const updateuser = (req, res) => {
  const id = req.params.userid;
  userModel
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
      }

      res.send({ message: "User Updated" });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
};

const deleteuser = (req, res) => {
  const id = req.params.userId;
  userModel
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
      }

      res.send({ message: "User Deleted" });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
};

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + profileImage);
};

const addFollowing = (req, res, next) => {
  userModel
    .findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
      }
      next();
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
};

const addFollower = async (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
    .populate("following", "name")
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(data);
    })
    .catch((e) => {
      res.send({ message: e.message || "Could not retrieve the user" });
    });
};

const removeFollowing = (req, res, next) => {
  userModel
    .findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.followId },
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found" });
      }
      next();
      // res.status(200).send({ message: "User unfollowed" });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
};

const removeFollower = async (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.body.followId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(data);
    })
    .catch((e) => {
      res.send({ message: e.message || "Could not retrieve the user" });
    });
};

const findPeople = async (req, res) => {
  let following = req.params.userId;
  // following.push(req.profile._id);
  try {
    let users = await userModel
      .find({ _id: { $nin: following } })
      .select("name");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  createUser,
  getallusers,
  getuser,
  updateuser,
  deleteuser,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  photo,
  defaultPhoto,
};
