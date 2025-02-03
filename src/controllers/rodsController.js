const { result } = require("lodash");
const model= require("../models/rodsModel.js");

module.exports.readAllRods = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAllRods:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    model.selectAll(callback);
  };

  //Read user and extract skillpoints
  module.exports.readUserByUsername = (req, res, next) => {
  const data = {
    username: req.body.username
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserByUsername:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
          res.locals.user_id = results[0].user_id
          res.locals.user_skillpoint = results[0].skillpoints
          next()
      }
    }
  };

  model.selectUserByUsername(data, callback);
};

//Read rod and extract skillpoints required and give error if not enough
module.exports.readRodById = (req, res, next) => {
  const data = {
    rod_id: req.params.rod_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readRodById:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Rod not found",
        });
      } else {
        if(req.body.username == undefined){
          res.status(200).json(results);
        }
        else{
          if((res.locals.user_skillpoint - results[0].required_skillpoints) < 0){
              res.status(402).json({
                  message: "Not enough skillpoints",
                });
          }
          else{
              res.locals.rod_name = results[0].rod_name
              res.locals.required_skillpoints = results[0].required_skillpoints
              res.locals.durability = results[0].durability
              next()
          }
        }
      }
    }
  };

  model.selectById(data, callback);
};

//Read if the user already have the rod and its still intact
module.exports.readUserRodByIdsAndNotBroken = (req, res, next) => {
  const data = {
    rod_id: req.params.rod_id,
    user_id: res.locals.user_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserRodByIdsAndNotBroken:", error);
      res.status(500).json(error);
    } else {
      if (results.length != 0) {
        res.status(404).json({
          message: "Rod already owned and not broken",
        });
      } else {
         next() 
      };
    }
  };

  model.checkUserRod(data, callback);
};

//Minus skillpoints
module.exports.updateSkillpointsById = (req, res, next) => {  
  const data = {
      skillpoints: (res.locals.user_skillpoint - res.locals.required_skillpoints),
      user_id: res.locals.user_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateSkillpointsById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found (Shouldnt happen)",
        });
      } else  {next()}
    }
  };

  model.updateById(data, callback);
};


module.exports.createNewUserRodRelationship = (req, res, next) => {
  if (res.locals.user_id == undefined || req.params.rod_id == undefined || res.locals.durability == undefined) {
    res.status(400).send("message: Missing required data (I dont think should happen)");
    return;
  }
  const data = {
      user_id: res.locals.user_id,
      rod_id: req.params.rod_id,
      durability: res.locals.durability
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewUserRodRelationship:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
          message: res.locals.rod_name + " purchased!"
      });
    }
  };

  model.insertSingle(data, callback);
};

// Delete rod for a specific user if its durability is 0
module.exports.deleteUserRodIfDurabilityZero = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    rod_id: req.params.rod_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteUserRodIfDurabilityZero:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Rod not found or not owned by user"
        });
      } else {
        // If durability is 0, delete the rod for the user
        if (results[0].durability <= 0) {
          model.deleteUserRodById(data, (deleteError, deleteResults) => {
            if (deleteError) {
              console.error("Error deleting rod for user:", deleteError);
              res.status(500).json(deleteError);
            } else {
              res.status(200).json({
                message: "Rod deleted due to 0 durability"
              });
            }
          });
        } else {
          res.status(200).json({
            message: "Rod is still intact"
          });
        }
      }
    }
  };

  model.selectUserRodById(data, callback);
};
