const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});