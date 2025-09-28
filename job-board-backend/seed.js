const mongoose = require('mongoose');
const seedDatabase = require('./src/utils/seedData');
require('dotenv').config({ path: './config.env' });

const seed = async () => {
 try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await seedDatabase();

  process.exit(0);
 } catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
 }
};

seed();

