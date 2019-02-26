module.exports = function(app) {
  //admin =1, student=2,
  var Role = app.models.Role;
  Role.registerResolver("admin", function(role, context, cb) {
    var userid = context.accessToken.userId;
    if (!userid) {
      return process.nextTick(() => cb(null, false));
    }
    var People = app.models.People;
    People.count({ id: userid, role: 1 }, (err, data) => {
      if (err) return cb(err);
      if (data > 0) {
        console.log("admin berhasil");
        return cb(null, true);
      } else {
        console.log("admin gagal");
        return cb(null, false);
      }
    });
  });

  Role.registerResolver("student", function(role, context, cb) {
    var userid = context.accessToken.userId;
    if (!userid) {
      return process.nextTick(() => cb(null, false));
    }
    var People = app.models.People;
    People.count({ id: userid, role: 2 }, (err, data) => {
      if (err) return cb(err);
      if (data > 0) {
        console.log("student berhasil");
        return cb(null, true);
      } else {
        console.log("student gagal");
        return cb(null, false);
      }
    });
  });
};
