const Tenant = require('../models/Tenant');
const User = require('../models/User');
const crypto = require('./../utility/crypto');

function fetchAllTenant(req, res, next) {
  Tenant.find()
    .then((tenants) => {
      res.send({
        confirmation: "success",
        data: tenants,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function storeTenant(req, res, next) {
  const requestBody = req.body;
  let newUser = new User();
  newUser.email = requestBody.primaryEmail;
  newUser.name = requestBody.primaryFirstName;
  newUser.password = crypto.aesEncrypt('Test1234@');;
  newUser.save();

  let newTenant = new Tenant();
  newTenant.name = requestBody.tenantName;
  newTenant.email = requestBody.tenantEmail;
  newTenant.addressOne = requestBody.addressOne;
  newTenant.addressTwo = requestBody.addressTwo;
  newTenant.city = requestBody.city;
  newTenant.state = requestBody.state;
  newTenant.zipcode = requestBody.zipCode;
  newTenant.country = requestBody.country;
  newTenant.phonenumber = requestBody.tenantPhone;
  newTenant.tenantUserId = newUser.objectId;
  newTenant.save()
  .then((tenant) => {
    res.send({
      confirmation: 'success',
      data: 'Tenant created successfully'
    });
  })
  .error((error) => {
    res.send({
      confirmation: 'error',
      data: 'Cannot able to create tenant'
    })
  });
}

module.exports = {
    fetchAllTenant,
    storeTenant
}
