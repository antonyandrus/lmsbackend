const res = require("express/lib/response");
const Designation = require("../models/Designation");

function getIdForRole(roleName, designation) {
  Designation.findOne({ name: roleName }).then((des) => {
    designation(des);
  });
}

module.exports = {
  getIdForRole,
};
