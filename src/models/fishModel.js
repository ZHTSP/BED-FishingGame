const pool = require('../services/db');

module.exports.selectById = (data, callback) => {
    const query = "SELECT * FROM fish WHERE fish_id = ?";
    pool.query(query, [data.fish_id], callback);
  };

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM fish ;
    `;

pool.query(SQLSTATMENT, callback);
}

module.exports.deleteById = (data, callback) => {
  const query = "DELETE FROM fish WHERE fish_id = ?";
  pool.query(query, [data.fish_id], callback);
};
