const mongoose = require("mongoose");
const selectedFolderSchema = new mongoose.Schema({
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "FolderStructure" },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "" },
});
const SelectedFolderForCanva = mongoose.model(
  "SelectedFolderForCanva",
  selectedFolderSchema
);
module.export = SelectedFolderForCanva;
