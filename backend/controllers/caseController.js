const Case = require('../models/Case');

const ATTORNEY_MAP = {
  Criminal:     'Adv. Ghufraan',
  Tax:          'Adv. Zain',
  RealEstate:   'Adv. Usman',
  Family:       'Adv. Anas',
  WomensRights: 'Adv. Javeria',
};

exports.getMyCases = async (req, res) => {
  try {
    const cases = await Case.find({ client: req.user.id }).sort({ createdAt: -1 });
    res.json(cases);
  } catch {
    res.status(500).json({ message: 'Failed to fetch cases.' });
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .populate('client', 'fullName email phone cnic')
      .sort({ createdAt: -1 });
    res.json(cases);
  } catch {
    res.status(500).json({ message: 'Failed to fetch cases.' });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const c = await Case.findById(req.params.id).populate('client', 'fullName email phone');
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    // Clients can only view their own case
    if (req.user.role !== 'admin' && c.client._id.toString() !== req.user.id)
      return res.status(403).json({ message: 'Access denied.' });
    res.json(c);
  } catch {
    res.status(500).json({ message: 'Failed to fetch case.' });
  }
};

exports.updateCase = async (req, res) => {
  try {
    const { experienceLevel, status, description, attorneyType } = req.body;
    const validTypes = ['Criminal', 'Tax', 'RealEstate', 'Family', 'WomensRights'];
    const validStatuses = ['Pending', 'Active', 'Closed', 'Adjourned'];
    const validLevels = ['Junior', 'Mid', 'Senior'];
    if (attorneyType && !validTypes.includes(attorneyType))
      return res.status(400).json({ message: 'Invalid attorney type.' });
    if (status && !validStatuses.includes(status))
      return res.status(400).json({ message: 'Invalid status.' });
    if (experienceLevel && !validLevels.includes(experienceLevel))
      return res.status(400).json({ message: 'Invalid experience level.' });

    const assignedAttorney = ATTORNEY_MAP[attorneyType] || 'Adv. Ghufraan';
    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { assignedAttorney, experienceLevel, status, description, attorneyType },
      { new: true, runValidators: true }
    ).populate('client', 'fullName email');
    if (!updated) return res.status(404).json({ message: 'Case not found.' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Update failed.' });
  }
};

exports.addHearing = async (req, res) => {
  try {
    const { date, notes } = req.body;
    if (!date) return res.status(400).json({ message: 'Hearing date is required.' });
    const c = await Case.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    c.hearings.push({ date, notes: notes || '' });
    await c.save();
    res.status(201).json(c);
  } catch {
    res.status(500).json({ message: 'Failed to add hearing.' });
  }
};

exports.deleteHearing = async (req, res) => {
  try {
    const c = await Case.findById(req.params.caseId);
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    c.hearings = c.hearings.filter(h => h._id.toString() !== req.params.hearingId);
    await c.save();
    res.json(c);
  } catch {
    res.status(500).json({ message: 'Failed to delete hearing.' });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const c = await Case.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ message: 'Case not found.' });
    res.json({ message: 'Case deleted.' });
  } catch {
    res.status(500).json({ message: 'Delete failed.' });
  }
};
