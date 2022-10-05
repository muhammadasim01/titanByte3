const mongoose = require("mongoose");
const canvaDesignCanva = new mongoose.Schema({
  designName: { type: String, required: true },
  designUrl: { type: String, required: true },
  folerId: { type: mongoose.Schema.Types.ObjectId, ref: "FolderStructure" },
});
const CanvaDesign = mongoose.model("CanvaDesign", canvaDesignCanva);

module.export = CanvaDesign;
