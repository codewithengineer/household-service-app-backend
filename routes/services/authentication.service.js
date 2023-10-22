const connection = require("../../config/mysql.db.config");

const service = {};

service.createUser = (data) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into ?? (??, ??, ??, ??, ??, ??) values (?, ?, ?, ?, ?, ?)";
    connection.query(
      query,
      [
        "users",
        "firstName",
        "lastName",
        "mobile",
        "email",
        "profileUrl",
        "password",
        data.fName,
        data.lName,
        data.mobileNumber,
        data.email,
        data.profileUrl,
        data.password,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ ...result });
        }
      }
    );
  });
};

service.getUser = (email, phone) => {
  return new Promise((resolve, reject) => {
    const query = `select id, concat(firstName, ' ', lastName) as name, password from ?? where email = ? || mobile = ?`;
    connection.query(
      query,
      ["users", email || null, phone || null],
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

service.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select id, concat(firstName, ' ', lastName) as name, password from ?? where id = ?`;
    connection.query(query, ["users", id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...result[0] });
      }
    });
  });
};

service.getUsersAccess = (id) => {
  return new Promise((resolve, reject) => {
    const query = "select ?? from ?? where ?? = ?";
    connection.query(query, ["isAdmin", "users", "id", id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...result[0] });
      }
    });
  });
};

service.updatePassword = (data) => {
  return new Promise((resolve, reject) => {
    const query = "update ?? set ?? = ? where ?? = ?";
    connection.query(
      query,
      ["users", "password", data.password, "id", data.userId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = service;
