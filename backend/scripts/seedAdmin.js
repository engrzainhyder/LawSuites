require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Client = require('../models/Client');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const exists = await Client.findOne({ email: 'admin@lawsuites.pk' });
  if (exists) { console.log('Admin already exists.'); process.exit(); }

  await Client.create({
    fullName: 'LawSuites Admin',
    email: 'admin@lawsuites.pk',
    phone: '03000000000',
    cnic: '0000000000000',
    password: await bcrypt.hash('Admin@1234', 10),
    role: 'admin',
  });
  console.log('Admin seeded: admin@lawsuites.pk / Admin@1234');
  process.exit();
})();
