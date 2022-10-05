require("dotenv").config();
const express = require("express");
const path = require("path");
const process = require("process");
const dbConnection = require("./db/dbConnection");
dbConnection();

// const corporateRoutes = require("./routes/corporateRoutes");
// const userRoutes = require("./routes/userRoutes");
const branchRoutes = require("./routes/branchRoutes");
// const emailRoutes = require("./routes/emailRoutes");
// const loRoutes = require("./routes/loRoutes");
// const folderRoutes = require("./routes/folderRoutes");
// const canvaRoutes = require("./routes/canvaRoutes");
// const socialTokensRoutes = require("./routes/tokenRoutes");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB" }));
app.use(bodyParser.json());

// app.use("/user", userRoutes);
// app.use("/corporate", corporateRoutes);
app.use("/branch", branchRoutes);
// app.use("/lo", loRoutes);
// app.use("/emails", emailRoutes);
// app.use("/folders", folderRoutes);
// app.use("/publish/", canvaRoutes);
// app.use("/tokens", socialTokensRoutes);

app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT ? process.env.PORT : 8000;

app.get("/", (req, res) => {
  res.send("Hello its working");
});
app.listen(PORT, () => {
  console.log(`listing on port ${PORT}`);
});
