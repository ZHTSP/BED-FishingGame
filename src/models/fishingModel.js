const pool = require("../services/db.js");

module.exports.checkUserRod = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM userrods
        WHERE user_id = ? AND rod_id = ? AND durability > 0;
        `;
    const VALUES = [data.user_id,data.rod_id];
    pool.query(SQLSTATMENT,VALUES, callback);
    }

module.exports.selectRandomFish = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM fish
        ORDER BY RAND()
        LIMIT 1
        `;
    
    pool.query(SQLSTATMENT, callback);
    }

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE userrods 
    SET durability = ?
    WHERE user_rod_id = ?
    ;
    `;
const VALUES = [data.durability, data.user_rod_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
    {
        const SQLSTATMENT = `
        INSERT INTO Backpack (user_id, fish_id)
        VALUES (?, ?);
        `;
    const VALUES = [data.user_id, data.fish_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }




