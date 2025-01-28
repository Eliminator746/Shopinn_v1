// ------------------------------------------------------------------------------------------------------------------------
//                                                          Purpose of Seeder Script
// ------------------------------------------------------------------------------------------------------------------------

// We are adding dummy data for admin user, who added products from their end + users in User db

// What is my ultimate goal
// To put admin id at the end of every product as per model in Product db
// And put all the users in User db

// 1. Clear existing data to avoid duplication
// 2. Insert all users in User db
// 3. Find admin user_id
// 4. Put this admin id to every product in data/product.js
// 5. Insert these products in Product db

// ------------------------------------------------------------------------------------------------------------------------

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/user.models.js';
import { Product } from './src/models/product.models.js';
import { Order } from './src/models/order.models.js';
import users from './data/user.js';
import products from './data/products.js';
import connectDB from './src/db/index.js';

dotenv.config({
  path: '../.env',
});

connectDB();

const importData = async () => {
  try {
    // Step 1: Clear existing data to avoid duplication
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Step 2: Insert all users in User db
    await User.insertMany(users);

    // Step 3: Find admin user_id
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      throw new Error('Admin user not found');
    }
    const adminId = adminUser._id;

    // Step 4: Put this admin id to every product in data/product.js
    const sampleProducts = products.map((item) => {
      return { ...item, user: adminId };
    });

    // Step 5: Insert these products in Product db
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {

  try {

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }

};

// console.log(process.argv);
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
