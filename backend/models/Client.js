const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    recommendedType: {
      type: String,
      enum: ['Criminal', 'Tax', 'RealEstate', 'Family', 'WomensRights'],
    },
    problemDescription: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);
