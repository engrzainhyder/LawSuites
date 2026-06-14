const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const Case = require('../models/Case');

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { fullName, email, phone, cnic, password, recommendedType, problemDescription } = req.body;
    const exists = await Client.findOne({ $or: [{ email }, { cnic }] });
    if (exists) return res.status(409).json({ message: 'Email or CNIC already registered.' });

    const hashed = await bcrypt.hash(password, 10);
    const client = await Client.create({
      fullName, email, phone, cnic,
      password: hashed,
      recommendedType,
      problemDescription,
    });

    if (recommendedType) {
      await Case.create({
        client: client._id,
        attorneyType: recommendedType,
        description: problemDescription || '',
      });
    }

    const token = signToken(client._id, client.role);
    res.status(201).json({ token, client: { id: client._id, fullName, email, role: client.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ email });
    if (!client) return res.status(401).json({ message: 'Invalid credentials.' });

    const match = await bcrypt.compare(password, client.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = signToken(client._id, client.role);
    res.json({ token, client: { id: client._id, fullName: client.fullName, email, role: client.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id).select('-password');
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ role: 'client' }).select('-password').sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Case.deleteMany({ client: req.params.id });
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client and associated cases deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
