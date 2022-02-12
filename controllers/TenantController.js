const Tenant = require('../models/Tenant');
const User = require('../models/User');
const crypto = require('./../utility/crypto');
const utility = require('../utility/utility');
const designationController = require('../controllers/DesignationController');
const mongoose = require('mongoose');

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
  designationController.getIdForRole('Human Resource Manager', (data) => {
    utility.getEmpId((empdata) => {
      let newUser = new User();
      newUser._id = new mongoose.Types.ObjectId;
      newUser.email = requestBody.primaryEmail;
      newUser.password = crypto.aesEncrypt('Test1234@');
      newUser.role = data._id;
      newUser.employeeId = empdata;
      const userinfo = {
        firstName: requestBody.primaryFirstName,
        lastName: requestBody.primaryLastName,
      }
      newUser.userinfo = userinfo;
      newUser.createdBy = new mongoose.Types.ObjectId;

      let newTenant = new Tenant();
      newTenant._id = new mongoose.Types.ObjectId;
      newTenant.name = requestBody.tenantName;
      newTenant.email = requestBody.tenantEmail;
      newTenant.tenantUserId = newUser._id;
      newTenant.createdBy = newUser._id;
      const location = {
        addressOne: requestBody.addressOne,
        addressTwo: requestBody.addressTwo,
        city: requestBody.city,
        state: requestBody.state,
        zipcode: requestBody.zipCode,
        country: requestBody.country,
        phonenumber: requestBody.tenantPhone,
        createdBy: newUser._id
      }
      newTenant.location = location;
      newUser.tenantId = newTenant._id;
      newUser.save();
      newTenant.save()
      .then((tenant) => {
        res.status(200).send({
          confirmation: tenant,
          data: 'Tenant created successfully'
        });
      });
    });
  });
}

module.exports = {
    fetchAllTenant,
    storeTenant
}
