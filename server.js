const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const usersRoutes = require('./routes/users');
const uploadRoutes = require("./routes/uploadRoutes");
const searchRoutes = require("./routes/searchDocuments");
const moderationRoutes = require('./routes/moderationRoutes');


const app = express();

app.use(bodyParser.json());

const apiVersion = 'v1';

app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/protected`, protectedRoutes);
app.use(`/api/${apiVersion}/users`, usersRoutes);
app.use(`/api/${apiVersion}/upload`, uploadRoutes);
app.use(`/api/${apiVersion}/search`, searchRoutes);
app.use(`/api/${apiVersion}/documents`, moderationRoutes);



const setupSwagger = require('./routes/swagger');
setupSwagger(app);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
  });
}
