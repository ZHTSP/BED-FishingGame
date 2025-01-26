const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM rods ;
    `;

pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM rods
        WHERE rod_id = ?;
        `;
    const VALUES = [data.rod_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

module.exports.selectUserByUsername = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM user
        WHERE username = ?;
        `;
    const VALUES = [data.username];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

module.exports.selectRodById = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM rods
        WHERE rod_id = ?;
        `;
    const VALUES = [data.rod_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.checkUserRod = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userrods
    WHERE user_id = ? AND rod_id = ? AND durability > 0;
    `;
    const VALUES = [data.user_id, data.rod_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE user 
        SET skillpoints = ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.skillpoints, data.user_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

    module.exports.insertSingle = (data, callback) =>
        {
            const SQLSTATMENT = `
            INSERT INTO userrods (user_id, rod_id, durability)
            VALUES (?, ?, ?);
            `;
        const VALUES = [data.user_id, data.rod_id, data.durability];
        
        pool.query(SQLSTATMENT, VALUES, callback);
        }