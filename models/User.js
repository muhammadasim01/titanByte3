const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
const User = mongoose.model("User", userSchema);
module.export = User;
