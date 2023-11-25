const connection = require("../../config/mysql.db.config");

const service = {};

service.createNewService = (name) => {
  return new Promise((resolve, reject) => {
    const query = `insert into services (name) values ("${name}")`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

service.createNewProviderForService = (id, uid) => {
  return new Promise((resolve, reject) => {
    const query = `insert into services_user (snid, usid) values (${id},${uid})`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

service.getAllServices = () => {
  return new Promise((resolve, reject) => {
    const query = `select s.*, count(su.id) as count from services as s left join services_user as su on s.id = su.snid group by s.id`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

service.getUsersByService = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select s.name as service_name, u.id, u.email, concat(u.firstName, " " ,u.lastName) as name, u.mobile, u.profileUrl, u.address from users as u left join services_user as su on u.id = su.usid left join services as s on s.id = su.snid where su.snid = ${id}`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
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
