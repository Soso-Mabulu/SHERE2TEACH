const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const setupSwagger = require('./routes/swagger');

// Import routes
const signupRoutes = require('./routes/signup');
const signinRoutes = require('./routes/signin');
const protectedRoutes = require('./routes/protected');
const usersRoutes = require('./routes/users');
const uploadRoutes = require('./routes/uploadRoutes');
//const searchRoutes = require('./routes/searchDocuments');
//const moderationRoutes = require('./routes/moderationRoutes');
const faqRoutes = require('./routes/faq');
const passwordResetRoutes = require('./routes/passreset');
const reportedFile = require('./routes/Report.js');
const documents = require('./routes/documents.js');

// Create express app
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*',
  credentials: true,
}));
app.use(bodyParser.json());

// API routes
const apiVersion = 'v1';
app.use(`/api/${apiVersion}/signup`, signupRoutes);
app.use(`/api/${apiVersion}/signin`, signinRoutes);
app.use(`/api/${apiVersion}/protected`, protectedRoutes);
app.use(`/api/${apiVersion}/users`, usersRoutes);
app.use(`/api/${apiVersion}/upload`, uploadRoutes);
//app.use(`/api/${apiVersion}/search`, searchRoutes);
//app.use(`/api/${apiVersion}/documents`, moderationRoutes);
app.use(`/api/${apiVersion}/faq`, faqRoutes);
app.use(`/api/${apiVersion}/password-reset`, passwordResetRoutes);
app.use(`/api/${apiVersion}/report`, reportedFile);
app.use (`/api/${apiVersion}/documents`, documents);


// Swagger setup
setupSwagger(app);

// Root endpoint
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the Share2Teach Backend API</h1>
            <p>Use the appropriate API endpoints to interact with the system.</p>
            <p>Refer to the <a href="/api-docs">API documentation</a> for more information.</p>`);
});

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
});

module.exports = { app, server };
