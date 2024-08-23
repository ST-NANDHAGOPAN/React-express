const mongoose = require('mongoose');
const { UserModel, SeedFlagModel } = require('../models/userModel');
const client = require('../elasticsearch/elasticsearchClient');

async function clearElasticsearchIndex() {
  try {
    await client.indices.delete({ index: 'users' }, { ignore: [404] });
    console.log('Elasticsearch index cleared.');
  } catch (error) {
    console.error('Error clearing Elasticsearch index:', error);
  }
}

async function seedElasticsearch() {
  try {
    await mongoose.connect('mongodb://localhost:27017/CRUD');

    await clearElasticsearchIndex();

    const isSeeded = await SeedFlagModel.findOne({ name: 'elasticsearch' });
    if (!isSeeded) {
      const users = await UserModel.find({});
      const body = users.flatMap(user => [
        { index: { _index: 'users', _id: user._id.toString() } },
        {
          name: user.name,
          age: user.age,
          email: user.email,
          address: user.address,
          image: user.image
        }
      ]);

      const bulkResponse = await client.bulk({ refresh: true, body });

      if (bulkResponse && bulkResponse.body && bulkResponse.body.errors) {
        console.error('Errors occurred during bulk indexing:', bulkResponse.body.errors);
      } else {
        console.log('Bulk indexing completed successfully.');
      }

      await SeedFlagModel.create({ name: 'elasticsearch' });
    } else {
      console.log('Data has already been seeded.');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    await mongoose.disconnect();
  }
}

seedElasticsearch();
