const pool = require("../services/db.js");

module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT 
            userrods.user_rod_id, 
            userrods.user_id, 
            user.username, 
            userrods.rod_id, 
            rods.rod_name, 
            userrods.durability
        FROM 
            userrods
        JOIN 
            user ON userrods.user_id = user.user_id
        JOIN 
            rods ON userrods.rod_id = rods.rod_id;
        `;
    
    pool.query(SQLSTATMENT, callback);
    }