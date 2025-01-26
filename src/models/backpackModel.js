const pool = require("../services/db.js");


module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT backpack.id, backpack.user_id, user.username, backpack.fish_id, fish.fish_name, fish.size from backpack
        JOIN user
        JOIN fish
        on backpack.user_id = user.user_id and backpack.fish_id = fish.fish_id; 
        `;
    
    pool.query(SQLSTATMENT, callback);
    }





