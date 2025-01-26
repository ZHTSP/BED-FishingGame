const pool = require("../services/db.js");


//4
module.exports.insertSingleChallenge = (data, callback) =>
    {
        const SQLSTATMENT = `
        INSERT INTO FitnessChallenge (challenge, creator_id, skillpoints)
        VALUES (?, ?, ?);
        `;
    const VALUES = [data.challenge, data.user_id, data.skillpoints];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//5
module.exports.selectAll = (callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM FitnessChallenge ;
        `;
    
    pool.query(SQLSTATMENT, callback);
    }

//6
module.exports.updateById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE fitnesschallenge
        SET challenge = ?, skillpoints = ?
        WHERE challenge_id = ?;
        `;
    const VALUES = [data.challenge, data.skillpoints, data.challenge_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }
//middleware
module.exports.selectByChallengeId = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM fitnesschallenge
        WHERE challenge_id = ?;
        `;
    const VALUES = [data.challenge_id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }
    
//7
module.exports.deleteById = (data, callback) =>
    {
        const SQLSTATMENT = `
        DELETE FROM fitnesschallenge
        WHERE challenge_id = ?;
        `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback); 
    }

module.exports.deleteChallengeFromCompletion = (data, callback) =>
    {
        const SQLSTATMENT = ` 
        DELETE FROM usercompletion
        WHERE challenge_id = ?
        `
    const VALUES = [data.challenge_id];
    pool.query(SQLSTATMENT, VALUES, callback); 
    }
    

module.exports.deleteChallengeById = (data, callback) =>
    {

        const SQLSTATMENT = ` 
        DELETE FROM fitnesschallenge
        WHERE challenge_id = ?

        `
        const VALUES = [data.challenge_id];
        pool.query(SQLSTATMENT, VALUES, callback); 
    }



//8

module.exports.insertSingleCompletion = (data, callback) =>
    {
        const SQLSTATMENT = `
        INSERT INTO usercompletion (challenge_id, user_id, completed, creation_date, notes)
        VALUES (?, ?, ?, ?, ?);
        `;
    const VALUES = [data.challenge_id, data.user_id, data.completed, data.creation_date, data.notes];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//8 middleware
module.exports.selectByUserId = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM User
        WHERE user_id = ?;
        `;
    const VALUES = [data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//8 middleware
module.exports.updateById = (data, callback) =>
    {
        const SQLSTATMENT = `
        UPDATE User 
        SET skillpoints = ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.skillpoints, data.id];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }

//9
module.exports.selectRecordsByChallengeId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM usercompletion
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challenge_id];

pool.query(SQLSTATMENT, VALUES, callback);
}