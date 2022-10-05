const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET_KEY);
}

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  bcrypt
    .hash(password, saltRounds)
    .then((data) => {
      User.insert(["email", "password"], [email, data])
        .then((result) => {
          console.log(result);
          return res.send(result);
        })
        .catch((err) => {
          return res.send(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  User.select(["email", "password"])
    .where("email", "=", email)
    .get()
    .then((result) => {
      console.log(result);

      if (!result[0]) {
        return res.sendStatus(404);
      }

      bcrypt
        .compare(password, result[0].password)
        .then((data) => {
          if (!data) {
            return res.json({
              success: false,
              message: `Invalid password for the user ${email}`,
            });
          }
          console.log(result[0]);

          const token = generateToken(result[0].email);
          return res.json({
            success: true,
            message: "Token generated for the user",
            token,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.send(error);
        });
    });
};

const getUserData = async (req, res) => {
  const { user } = req.body;
  try {
    const userData = await User.select(["email", "user_id"])
      .where("user_id", "=", user)
      .get();
    if (userData) {
      return res.json(userData[0]);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser, getUserData };
