const pool = require('../services/db');


module.exports.selectById = (data, callback) => {
  const query = "SELECT * FROM user WHERE user_id = ?";
  db.query(query, [data.user_id], callback);
};

//qn1
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, skillpoints)
    VALUES (?, ?);
    `;
const VALUES = [data.username, data.skillpoints];

pool.query(SQLSTATMENT, VALUES, callback);
}

//qn1 middleware
module.exports.selectByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * from User
    WHERE username = ?;
    `;
const VALUES = [data.username];

pool.query(SQLSTATMENT, VALUES, callback);
}
    
//qn2 
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM user ;
    `;

pool.query(SQLSTATMENT, callback);
}

//qn3
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, skillpoints = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.username, data.skillpoints, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}




//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////
module.exports.selectByUsername = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM user
        WHERE username = ?;
        `;
    const VALUES = [data.username];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }
//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectByUsernameEmail = (data, callback) =>
    {
        const SQLSTATMENT = `
        SELECT * FROM user
        WHERE username = ? or email = ?;
        `;
    const VALUES = [data.username, data.email];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }
//////////////////////////////////////////////////////
// Register user
//////////////////////////////////////////////////////
module.exports.insertRegisterSingle = (data, callback) =>
    {
        const SQLSTATMENT = `
        INSERT INTO user (username, email, password)
        VALUES (?, ?, ?);
        `;
    const VALUES = [data.username, data.email, data.password];
    
    pool.query(SQLSTATMENT, VALUES, callback);
    }


    module.exports.selectAll = (callback) => {
        const SQLSTATMENT = `
          SELECT * FROM User;
          `;
      
        pool.query(SQLSTATMENT, callback);
      };


