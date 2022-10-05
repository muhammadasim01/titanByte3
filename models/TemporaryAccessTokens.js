const mongoose = require("mongoose");
const temporaryAccessTokenSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  accesstokenSecret: { type: String, required: true },
  websiteUrl: { type: String, required: true },
});
const TemporaryAccessToken = mongoose.model(
  "TemporaryAccessToken",
  temporaryAccessTokenSchema
);
module.export = TemporaryAccessToken;
