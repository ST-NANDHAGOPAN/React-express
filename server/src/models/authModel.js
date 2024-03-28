// models/Admin.js
const mongoose = require('mongoose');

const adminRegisterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    first_name :{ type: String, required: true }, 
    last_name :{ type: String, required: true }, 
    password: { type: String, required: true },
    password_confirmation :{ type: String }
});
const AdminRegisterModel = mongoose.model('AdminRegister', adminRegisterSchema);

module.exports = {AdminRegisterModel};

