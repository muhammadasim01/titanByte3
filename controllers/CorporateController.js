const { Branch } = require("../models/Branch");
const { Corporate } = require("../models/Corporate");
const { SubSites } = require("../models/SubSites");

// for showing all Corporate
const showAllCorporates = async (req, res) => {
  try {
    const data = await Corporate.all();
    for await (let element of data) {
      element.children = [];
      const branches = await Branch.select()
        .where("branch.corporate_id", "=", element.corporate_id)
        .get();
      element.children.push(branches);
      for await (let branch of branches) {
        branch.children = [];
        const los = await Lo.select()
          .where("lo.branch_id", "=", branch.branch_id)
          .get();
        branch.children.push(los);
      }
    }
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// for handling the creation of a new Corporate
const createNewCorporate = (req, res) => {
  const {
    corporate_email,
    corporate_name,
    corporate_type,
    website_url,
    location,
  } = req.body;
  Corporate.insert(
    [
      "corporate_email",
      "corporate_name",
      "corporate_type",
      "website_url",
      "location",
    ],
    [corporate_email, corporate_name, corporate_type, website_url, location]
  )
    .then((data) => {
      // get all affiliated sites
      return res.send(data);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const getCorporateId = async (req, res) => {
  const { websiteUrl } = req.body;
  console.log(req.body);

  try {
    const corporate_id = await Corporate.select(["corporate_id"])
      .where("website_url", "=", websiteUrl)
      .get();
    if (corporate_id) {
      return res.json({
        success: true,
        corporate_id: corporate_id[0].corporate_id,
      });
    }
    return res.json({
      success: false,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = {
  showAllCorporates,
  createNewCorporate,
  getCorporateId,
};
