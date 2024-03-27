const UserModel = require('../models/userModel');
const fs = require("fs")
const path = require("path")

exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json({ data: data, message: "Data GET Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal error: " + error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    res.json({ data: data, message: "Unique Data GET Success" });
  } catch (error) {
    res.status(500).json({ message: "Internal error: " + error });
  }
};

exports.createUser = async (req, res) => {
  console.log( "body" ,req.body,"file" , req.file );
  try {
    const { name, age, email, address } = req.body;
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    const  filename  = req.file.originalname; 
    const fileData = req.file.buffer;
    const uploadDir = path.join(__dirname , ".." , ".." , "public" , "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadDir, filename), fileData);

    const postData = new UserModel({
      name: name,
      age: age,
      email: email,
      address: address,
      image :filename,
    });
    await postData.save();
    const responseData = {
      receivedData: postData,
      message: "Data Received Successfully",
    };
    res.json(responseData);
  } catch (error) {
    res.status(500).send({ message: "Internal error: " + error });
  }
};

exports.updateUserById = async (req, res) => {
  console.log( "body" ,req.body,"file" , req.file  ,"req",req);
  try {
    const id = req.params.id;
    const { name, age, email, address } = req.body;
    const putData = await UserModel.findByIdAndUpdate(
      id,
      { name, age, email, address },
      { new: true }
    );
    if (!putData) {
      return res.status(404).json({ message: "Data not found" });
    }
    const responseData = {
      receivedData: putData,
      message: "Data Updated Successfully",
    };
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal error: " + error });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await UserModel.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({ message: "Data not found" });
    }
    const responseData = { message: "Data Deleted Successfully" };
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal error: " + error });
  }
};
