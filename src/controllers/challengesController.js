const model = require("../models/challengesModel.js");

//4
module.exports.createNewChallenges = (req, res, next) => {
    if (req.body.challenge == undefined || req.body.user_id == undefined || req.body.skillpoints == undefined) {
      res.status(400).send("message: Missing required data");
      return;
    }
    const data = {
    challenge: req.body.challenge,
    user_id: req.body.user_id,
    skillpoints: req.body.skillpoints
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error createNewChallenge:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json({
            challenge_id: results.insertId,
            challenge: req.body.challenge,
            creator_id: req.body.user_id,
            skillpoints: req.body.skillpoints
        });
      }
    };

    model.insertSingleChallenge(data, callback);
};

//5
module.exports.readAllChallenges = (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAllChallenges:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    model.selectAll(callback);
  };

//6
module.exports.updateChallengeById = (req, res, next) => {
    if (req.body.challenge == undefined || req.body.user_id == undefined || req.body.skillpoints  == undefined) {
      res.status(400).send("message: Missing required data");
      return;
    }
    const data = {
    challenge: req.body.challenge,
    skillpoints: req.body.skillpoints,
    challenge_id: req.params.challenge_id,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updateChallengeById:", error);
        res.status(500).json(error);
      } else {
        if(res.locals.user_id != req.body.user_id){
            res.status(403).json({
                message: "Wrong creator",
              });
        }
          else {
          res.status(200).json({
            challenge_id: req.params.challenge_id,
            challenge: req.body.challenge,
            creator_id: req.body.user_id,
            skillpoints: req.body.skillpoints
        });
    }
    };
  }
    model.updateChallengeById(data, callback);
  };

//middleware
module.exports.readChallengeById = (req, res, next) => {
    const data = {
        challenge_id: req.params.challenge_id,
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readChallengeById:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
            res.status(404).json({
              message: "Challenge not found",
            });
          }
        else{
        res.locals.user_id = results[0].creator_id
        res.locals.challengeskillpoints = results[0].skillpoints 
        next()
      }
    };
    }
    model.selectByChallengeId(data, callback);
  };

//7
module.exports.deleteChallengeById = (req, res, next) =>
  {
      const data = {
          id: req.params.challenge_id
      }
      const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteChallengeById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Challenge not found"
                });
            }
            else res.status(204).json({
                message: "Challenge deleted"
            }); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}

//middleware
module.exports.removeChallengeFromCompletion  = (req, res, next) => {
      
  const data = {
    challenge_id: req.params.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteChallengeFromCompletion:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        return res.status(404).json({ error: "Challenge ID does not exist" });
      } else {
          next();

      }
    }
  };

  model.deleteChallengeFromCompletion(data, callback);
};


module.exports.removeChallenge = (req, res, next) =>
    {
        const data = {
            challenge_id: req.params.challenge_id
        }
    
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error deleteChallengebyId:", error);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0) 
                {
                  return res.status(404).json({ error: "No challenge found"});

                }
                else res.status(204).json(); // 204 No Content            
            }
        }
    
        model.deleteChallengeById(data, callback);
    }

//8
module.exports.createNewCompletion = (req, res, next) => {
    if (req.body.creation_date == undefined) {
      res.status(400).send("message: Missing required data");
      return;
    }
    const data = {
        user_id: res.locals.user_id,
        completed: req.body.completed,
        creation_date: req.body.creation_date,
        notes: req.body.notes,
        challenge_id: req.params.challenge_id
    };
  
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error createNewCompletion:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json({
            completeId: req.body.completed,
            challengeId: req.params.challenge_id,
            user_id: res.locals.user_id,
            completed: true,
            creation_date: new Date(),
            notes: req.body.notes
        });
      }
    };

    model.insertSingleCompletion(data, callback);
};

//8 middleware
module.exports.readUserById = (req, res, next) => {
  const data = {
    id: req.body.user_id,
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
      } else{ 
        res.locals.userSkillpoints = results[0].skillpoints
        next();
      }
    }
  };

  model.selectByUserId(data, callback);
};

//8 middleware
module.exports.updateUserSkillpointsById = (req, res, next) => {
  const data = {
    skillpoints: 0,
    id: req.body.user_id
};
if (req.body.completed == true){
  data.skillpoints = (res.locals.userSkillpoints + res.locals.challengeskillpoints)
}
else{
if (req.body.completed == false){
  data.skillpoints = (res.locals.userSkillpoints + 5)
}
else{
  res.status(400).send({
    message: "Missing or invalid completed data"
  });
}
}
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserSkillpointsById:", error);
      res.status(500).json(error);
    }
    else{ next() }
  };

  model.updateById(data, callback);
};

//9
module.exports.readCompleteRecordByChallengeId = (req, res, next) => {
  const data = {
    challenge_id: req.params.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readCompleteRecordByChallengeId:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Records not found",
        });
      } else res.status(200).json(results);
    }
  };

  model.selectRecordsByChallengeId(data, callback);
};