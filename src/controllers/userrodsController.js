const model = require("../models/userrodsModel.js");

module.exports.readAllUserrods = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAllUserrods:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    model.selectAll(callback);
  };
