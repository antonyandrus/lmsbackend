const User = require("../models/User");

function getEmpId(employee) {
  User.count({}, function (err, count) {
    if (err) return handleError(err);
    employee("E" + new Date().getFullYear() + (count + 1));
  });
}

module.exports = {
  getEmpId,
};
