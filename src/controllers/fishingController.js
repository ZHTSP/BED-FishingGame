const model= require("../models/fishingModel.js");


module.exports.readUserRodByIdsAndNotBroken = (req, res, next) => {
    const data = {  
      rod_id: req.params.rod_id,
      user_id: req.params.user_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readUserRodByIdsAndNotBroken:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "You don't own a rod or your rod is broken, go buy one.",
          });
        } else {
            res.locals.user_rod_id = results[0].user_rod_id
            res.locals.durability = results[0].durability
           next() 
        };
      }
    };
  
    model.checkUserRod(data, callback);
  };


  module.exports.catchfish = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error catchfish:", error);
        res.status(500).json(error);
      } else {
        res.locals.catchfish_id=results[0].fish_id
        res.locals.catchfish_name=results[0].fish_name
        res.locals.catch_size=results[0].size
        next()
      };
    };
    model.selectRandomFish(callback);
  };

module.exports.updateDurabilityById = (req, res, next) => {
    const data = {
        durability: (res.locals.durability)-10,
        user_rod_id: res.locals.user_rod_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updateDurabilityById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "userrodrelationship not found",
          });
        } else {
        next()
        };
      }
    };
  
    model.updateById(data, callback);
  };

  module.exports.storeFish = (req, res, next) => {
    if (req.params.user_id == undefined || res.locals.catchfish_id == undefined) {
      res.status(400).send("message: Missing required data");
      return;
    }
    const data = {
        user_id: req.params.user_id,
        fish_id: res.locals.catchfish_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error storeFish:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json({
            message: "You have caught a fish! Fish caught: " + res.locals.catchfish_name,
            fish_size: res.locals.catch_size,
            fish_id: res.locals.catchfish_id
        });
      }
    };

    model.insertSingle(data, callback);
};
