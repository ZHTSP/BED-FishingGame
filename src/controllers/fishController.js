const model= require("../models/fishModel.js");

module.exports.readAllFish = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAllFish:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    model.selectAll(callback);
  };

module.exports.readFishById = (req, res, next) => {
    const data = {
      fish_id: req.params.fish_id,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readFishById:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "Fish not found",
          });
        } else res.status(200).json(results[0]);
      }
    };

    model.selectById(data, callback);
  };
