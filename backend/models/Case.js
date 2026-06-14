const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  notes: { type: String, default: '' },
});

const caseSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    caseNumber: { type: String, unique: true },
    attorneyType: {
      type: String,
      enum: ['Criminal', 'Tax', 'RealEstate', 'Family', 'WomensRights'],
      required: true,
    },
    assignedAttorney: { type: String, default: 'Unassigned' },
    experienceLevel: {
      type: String,
      enum: ['Junior', 'Mid', 'Senior'],
      default: 'Mid',
    },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'Closed', 'Adjourned'],
      default: 'Pending',
    },
    description: { type: String },
    hearings: [hearingSchema],
  },
  { timestamps: true }
);

caseSchema.pre('save', async function (next) {
  if (!this.caseNumber) {
    const count = await mongoose.model('Case').countDocuments();
    this.caseNumber = `LS-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Case', caseSchema);
