const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import Configurations & Utilities
const { PORT } = require('./config/env');

// Import Services
const { startScheduler } = require('./services/schedulerService');

// Import Routes
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();

// Middleware Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup API Routes
app.use('/', reminderRoutes);

// Start the CRON Scheduler
startScheduler();

// Start the Express Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});