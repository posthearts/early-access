const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const accessCodeRoutes = require('./routes/accessCodeRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Access Code API');
    });
app.use('/api', accessCodeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});