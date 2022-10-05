const mongoose = require("mongoose");
const currentSiteForTokenSchema = new mongoose.Schema({
  tokenType: { type: String, required: true },
  websiteUrl: { type: String, required: true },
});
const CurrentSiteForToken = mongoose.model(
  "CurrentSiteForToken",
  currentSiteForTokenSchema
);
module.export = CurrentSiteForToken;
