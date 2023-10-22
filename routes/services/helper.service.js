const connection = require("../../config/mysql.db.config");

const service = {};
service.getUserIfAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "select * from ?? where ?? = ? and ?? = ?";
    connection.query(
      query,
      ["users", "id", id, "isAdmin", true],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...result[0] });
        }
      }
    );
  });
};

// Get details of user by id
service.getUser = async (id) => {
  return new Promise((resolve, reject) => {
    const query = `select concat(??, ' ', ??) as ??, ?? from ?? where ?? = ? and ?? = ?`;
    connection.query(
      query,
      [
        "firstName",
        "lastName",
        "name",
        "email",
        "users",
        "id",
        id,
        "delete",
        0,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...result[0] });
        }
      }
    );
  });
};

module.exports = service;
