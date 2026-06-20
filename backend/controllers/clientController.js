const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Client = require('../models/Client');
const Case = require('../models/Case');

const ATTORNEY_MAP = {
  Criminal:     'Adv. Ghufraan',
  Tax:          'Adv. Zain',
  RealEstate:   'Adv. Usman',
  Family:       'Adv. Anas',
  WomensRights: 'Adv. Javeria',
};

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  try {
    const { fullName, email, phone, cnic, password, recommendedType, problemDescription } = req.body;
    const exists = await Client.findOne({ $or: [{ email }, { cnic }] });
    if (exists) return res.status(409).json({ message: 'Email or CNIC already registered.' });

    const hashed = await bcrypt.hash(password, 12);
    const client = await Client.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      cnic: cnic.trim(),
      password: hashed,
      recommendedType,
      problemDescription,
    });

    if (recommendedType) {
      await Case.create({
        client: client._id,
        attorneyType: recommendedType,
        assignedAttorney: ATTORNEY_MAP[recommendedType] || 'Adv. Ghufraan',
        description: problemDescription || '',
      });
    }

    const token = signToken(client._id, client.role);
    res.status(201).json({ token, client: { id: client._id, fullName: client.fullName, email: client.email, role: client.role } });
  } catch {
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ email: email.toLowerCase().trim() });
    if (!client) return res.status(401).json({ message: 'Invalid credentials.' });

    const match = await bcrypt.compare(password, client.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = signToken(client._id, client.role);
    res.json({ token, client: { id: client._id, fullName: client.fullName, email: client.email, role: client.role } });
  } catch {
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id).select('-password');
    if (!client) return res.status(404).json({ message: 'User not found.' });
    res.json(client);
  } catch {
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ role: 'client' }).select('-password').sort({ createdAt: -1 });
    res.json(clients);
  } catch {
    res.status(500).json({ message: 'Failed to fetch clients.' });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found.' });
    if (client.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin accounts.' });
    await Case.deleteMany({ client: req.params.id });
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client and associated cases deleted.' });
  } catch {
    res.status(500).json({ message: 'Delete failed.' });
  }
};
