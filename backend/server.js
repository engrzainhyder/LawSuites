require('dotenv').config();

// Fail fast if required env vars are missing
if (!process.env.MONGO_URI) { console.error('FATAL: MONGO_URI not set in .env'); process.exit(1); }
if (!process.env.JWT_SECRET) { console.error('FATAL: JWT_SECRET not set in .env'); process.exit(1); }

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

connectDB();

const app = express();

// Security headers
app.use(helmet());

// Strict CORS — only allow our frontend
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));

// Body size limit — prevents oversized payload attacks
app.use(express.json({ limit: '10kb' }));

// Rate limiter on auth routes — max 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'Too many requests. Please try again later.' },
});

app.use('/api/clients/login', authLimiter);
app.use('/api/clients/register', authLimiter);

app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/cases', require('./routes/caseRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Global error handler — never expose internal errors to client
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
