const model= require("../models/usersModel.js");


  module.exports.readUserById = (req, res, next) => {
    const data = {
      id: req.params.id,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(200).json(results[0]);
      }
    };

    model.selectById(data, callback);
  };



  //qn1


  module.exports.createNewUser = (req, res, next) => {
    if (req.body.username == undefined) {
      res.status(400).send("message: Missing required data");
      return;
    }
    const data = {
      username: req.body.username,
      skillpoints: 0
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error createNewUser:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json({
            userId: results.insertId,
            username: data.username,
            skillpoints: 0
        });
      }
    };

    model.insertSingle(data, callback);
};

module.exports.readUserByUsername = (req, res, next) => {
    const data = {
      username: req.body.username,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readUserByUsername:", error);
        res.status(500).json(error);
      } else {
        if (results.length != 0) {
          res.status(409).json({
            message: "Username is taken",
          });
        } else next();
      }
    };
  
    model.selectByUsername(data, callback);
  };

  //qn2
  
  module.exports.readAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAllUsers:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    model.selectAll(callback);
  };

//qn3

module.exports.updateUserById = (req, res, next) => {
    if (req.body.username == undefined) {
      res.status(400).send("message: Missing required data");
      return;
    }
    const data = {
      username: req.body.username,
      skillpoints: req.body.skillpoints,
      id: req.params.user_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updateUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        }
          else {
          res.status(201).json({
          user_id: req.params.user_id,
          username: req.body.username,
          skillpoints: req.body.skillpoints
        });
      }
    };
  }
    model.updateById(data, callback);
  };











