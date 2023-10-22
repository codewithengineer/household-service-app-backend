const connection = require("../../config/mysql.db.config");

const service = {};

service.getUserData = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "select * from ?? where id=? && `delete`=0";
    connection.query(query, ["users", id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...result[0] });
      }
    });
  });
};

service.getUserDataById = async (id) => {
  return new Promise((resolve, reject) => {
    const query = "select ??, ??, ??, ??, ?? from ?? where id=? && `delete`=0";
    connection.query(
      query,
      ["id", "firstName", "lastName", "email", "profileUrl", "users", id],
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

service.updateUserInfo = async (data) => {
  let setDataQuery = "";

  let dataToUpdate = [
    "firstName",
    "lastName",
    "email",
    "designation",
    "address",
    "bankName",
    "accountHoldersName",
    "accountType",
    "IFSC_Code",
    "profileUrl",
    "dob",
  ];

  for (const key of dataToUpdate) {
    if (data[key]) {
      setDataQuery += ` ${key}=\'${data[key]}\', `;
    }
  }

  dataToUpdate = ["mobile", "accountNumber"];

  for (const key of dataToUpdate) {
    if (data[key]) {
      setDataQuery += ` ${key}=${data[key]}, `;
    }
  }

  return new Promise((resolve, reject) => {
    const query =
      "update ?? set " +
      setDataQuery +
      ` id=${data.id}  where id=${data.id} && \`delete\`=0`;
    connection.query(query, ["users"], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ ...result });
      }
    });
  });
};

service.deleteUser = async ({ id }) => {
  return new Promise((resolve, reject) => {
    const query = "delete from ?? where id=?";
    connection.query(query, ["users", id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = service;
