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

module.exports.deleteFishFromBackpack = (req, res) => {
    const { user_id, fish_id } = req.params;

    const data = { user_id, fish_id };

    const callback = (error, results) => {
        if (error) {
            console.error("Error deleting fish from backpack:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    message: "Fish not found in backpack"
                });
            } else {
                res.status(200).json({
                    message: "Fish deleted from backpack successfully"
                });
            }
        }
    };

    model.deleteFish(data, callback);
};

