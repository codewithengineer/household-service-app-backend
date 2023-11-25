const connection = require("../../config/mysql.db.config");

const service = {};

service.createNewAppointment = (data) => {
  return new Promise((resolve, reject) => {
    const query = `insert into appointment (pid, uid, sid, \`date\`, \`desc\`) values (?, ?, ?, ?, ?)`;
    connection.query(
      query,
      [data.pid, data.uid, data.sid, data.date, data.desc],
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

service.approveAppointment = (id, uid) => {
  return new Promise((resolve, reject) => {
    const query = `update appointment set \`status\`=1 where id=${id} and pid=${uid}`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

service.getAppointmentDetails = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select 
    s.name as service_name,
    a.id,
    a.status,
    a.date,
    p.id as pid, concat(p.firstName, ' ', p.lastName) as pname, p.email as pemail, 
    u.id as uid, concat(u.firstName, ' ', u.lastName) as uname, u.email as uemail
    from appointment as a left join users as p on p.id = a.pid left join users as u on u.id = a.uid left join services as s on a.sid = s.id where a.id = ${id}`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          result.map((rec) => ({
            service_name: rec.service_name,
            id: rec.id,
            status: rec.status,
            date: rec.date,
            provider: {
              id: rec.pid,
              name: rec.pname,
              email: rec.pemail,
            },
            user: {
              id: rec.uid,
              name: rec.uname,
              email: rec.uemail,
            },
          }))[0]
        );
      }
    });
  });
};

service.getAppointment = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select 
    s.name as service_name,
    a.id,
    a.status,
    a.date,
    p.id as pid, concat(p.firstName, ' ', p.lastName) as pname, p.email as pemail, 
    u.id as uid, concat(u.firstName, ' ', u.lastName) as uname, u.email as uemail
    from appointment as a left join users as p on p.id = a.pid left join users as u on u.id = a.uid left join services as s on a.sid = s.id where a.pid = ${id}`;
    connection.query(query, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          result.map((rec) => ({
            service_name: rec.service_name,
            id: rec.id,
            status: rec.status,
            date: rec.date,
            provider: {
              id: rec.pid,
              name: rec.pname,
              email: rec.pemail,
            },
            user: {
              id: rec.uid,
              name: rec.uname,
              email: rec.uemail,
            },
          }))
        );
      }
    });
  });
};

service.getAppointmentDetailsByUser = (id) => {
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

module.exports = service;
