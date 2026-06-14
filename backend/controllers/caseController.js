const Case = require('../models/Case');

exports.getMyCases = async (req, res) => {
  try {
    const cases = await Case.find({ client: req.user.id }).sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate('client', 'fullName email phone cnic')
      .sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const c = await Case.findById(req.params.id).populate('client', 'fullName email phone');
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const { assignedAttorney, experienceLevel, status, description, attorneyType } = req.body;
    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { assignedAttorney, experienceLevel, status, description, attorneyType },
      { new: true, runValidators: true }
    ).populate('client', 'fullName email');
    if (!updated) return res.status(404).json({ message: 'Case not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addHearing = async (req, res) => {
  try {
    const { date, notes } = req.body;
    const c = await Case.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    c.hearings.push({ date, notes });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteHearing = async (req, res) => {
  try {
    const c = await Case.findById(req.params.caseId);
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    c.hearings = c.hearings.filter(h => h._id.toString() !== req.params.hearingId);
    await c.save();
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    await Case.findByIdAndDelete(req.params.id);
    res.json({ message: 'Case deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
