const User = require('../models/User');

function getUserList (req, res, next) {
  User.find()
  .then(users => {
    res.send({
      confirmation: 'success',
      data: users,
    })
  })
  .catch(err => {
    console.log(err);
  })
};

function login (req, res, next) {

}

module.exports = {
  login,
  getUserList
}
