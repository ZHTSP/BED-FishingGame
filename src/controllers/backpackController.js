const model = require("../models/backpackModel.js");

module.exports.readAllBackpack = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAll*TABLE*:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    model.selectAll(callback);
  };



