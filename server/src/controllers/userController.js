const {UserModel, UserAddressModel} = require('../models/userModel');
const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken");
const { AdminRegisterModel } = require('../models/authModel');
const client = require('../elasticsearch/elasticsearchClient');

exports.getAllUsers = async (req, res) => {
  try {
    const { search: query, items_per_page, page, sort, order } = req.query;

    // If there's a query parameter, perform search using Elasticsearch
    if (query) {
      try {
        const body = await client.search({
          index: 'users',
          body: {
            query: {
              wildcard: {
                name: `*${query.toLowerCase()}*`
              }
            }
          }
        });
     
        // Check if 'body' and 'body.hits' exist before trying to access them
        if (body && body.hits) {
          return res.json({
            total: body.hits.total.value,
            data: body.hits.hits.map(hit => hit._source),
            message: "Search successful"
          });
        } else {
          console.error('Unexpected Elasticsearch response structure:', body);
          return res.status(500).json({ message: "Unexpected Elasticsearch response format" });
        }
      } catch (error) {
        console.error('Error searching Elasticsearch:', error);
        return res.status(500).json({ message: "Error searching Elasticsearch: " + error.message });
      }
    }

    // Otherwise, fetch all users from the MongoDB database
    const limit = parseInt(items_per_page) || 10;
    const pageIndex = parseInt(page) || 1;
    const skip = limit * (pageIndex - 1);

    let sortOptions = {};
    const sortBy = sort || 'createdAt'; 
    const sortOrder = order === 'desc' ? -1 : 1;

    sortOptions[sortBy] = sortOrder;

    const pipeline = [
      { $sort: sortOptions },
      { $skip: skip },
      { $limit: limit }
    ];

    const data = await UserModel.aggregate(pipeline);
    const totalData = await UserModel.countDocuments();
    const totalDataReceived = data.length;
    const totalPages = Math.ceil(totalData / limit);

    const pagination = {
      page: pageIndex,
      first_page_url: `/?page=1`,
      from: skip + 1,
      last_page: totalPages,
      links: [],
      next_page_url: pageIndex < totalPages ? `/?page=${pageIndex + 1}` : null,
      items_per_page: limit.toString(),
      prev_page_url: pageIndex > 1 ? `/?page=${pageIndex - 1}` : null,
      to: skip + data.length,
      totalData: totalData,
      totalDataReceived: totalDataReceived
    };

    // Generate links for pagination
    if (pageIndex > 1) {
      pagination.links.push({
        url: `/?page=${pageIndex - 1}`,
        label: "&laquo; Previous",
        active: false,
        page: pageIndex - 1
      });
    }

    for (let i = 1; i <= totalPages; i++) {
      pagination.links.push({
        url: i === pageIndex ? null : `/?page=${i}`,
        label: i.toString(),
        active: i === pageIndex,
        page: i
      });
    }

    if (pageIndex < totalPages) {
      pagination.links.push({
        url: `/?page=${pageIndex + 1}`,
        label: "Next &raquo;",
        active: false,
        page: pageIndex + 1
      });
    }

    res.json({ pagination: pagination, data: data, message: "Data GET Success" });
  } catch (error) {
    console.error('Internal error:', error);
    res.status(500).json({ message: "Internal error: " + error.message });
  }
};



exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    res.json({ data: data, message: "Unique Data GET Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.createUser = async (req, res) => {
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

    await client.index({
      index: 'users',
      id: postData._id.toString(),
      body: {
        name: postData.name,
        age: postData.age,
        email: postData.email,
        address: postData.address,
        image: postData.image,
      }
    });

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
  try {
    const id = req.params.id;
    const { name, age, email, address } = req.body;
    let updateData = { name, age, email, address };
    
    if (req.file) {
      const filename = req.file.originalname;
      const fileData = req.file.buffer;
      const uploadDir = path.join(__dirname, "..", "..", "public", "uploads");
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, filename), fileData);

      updateData.image = filename;
    }

    const putData = await UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!putData) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Update the user data in Elasticsearch
    await client.update({
      index: 'users',
      id: id,
      body: {
        doc: updateData
      }
    });

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

    // Delete the user data from Elasticsearch
    await client.delete({
      index: 'users',
      id: id
    });

    const responseData = { message: "Data Deleted Successfully" };
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal error: " + error });
  }
};


exports.getuserAddress = async (req,res) => {
  try {
    // Step 4: Query the database for all user details
    const users = await UserAddressModel.find({});
    const totalData = await UserAddressModel.countDocuments();
    // Step 5: Send the retrieved user details as a response
    res.status(200).json({data: users, totalData:totalData, message: "Data GET Success"});
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getUserAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserAddressModel.findById(id);
    res.json({ data: data, message: "Unique Data GET Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.createUserAddress = async (req, res) => {
  try {
    const { first_name, last_name, address, phone_no  } = req.body;
    const token = req.headers.authorization;
    const tokenWithoutBearer = token.split(' ')[1];

    const dbw = jwt.verify(tokenWithoutBearer,process.env.JWT_SECRET);
    console.log("dbw",dbw);
    const userdata = await AdminRegisterModel.find({email:dbw.email})
    console.log("user_id" ,userdata);

    const user_id = userdata[0]._id

    const postData = new UserAddressModel({
      first_name: first_name,
      last_name: last_name,
      address: address,
      phone_no :phone_no,
      user_id : user_id
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

exports.updateUserAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, address, phone_no } = req.body;
    const putData = await UserAddressModel.findByIdAndUpdate(
      id,
      { first_name, last_name, address, phone_no },
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

exports.deleteUserAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await UserAddressModel.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(404).json({ message: "Data not found" });
    }
    const responseData = { message: "Data Deleted Successfully" };
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal error: " + error });
  }
};