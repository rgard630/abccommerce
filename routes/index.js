// index.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./config/connection');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Tag = require('./models/Tag');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Import routes
const productRoutes = require('./routes/product-routes');
const categoryRoutes = require('./routes/category-routes');
const tagRoutes = require('./routes/tag-routes');

// Use routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/tags', tagRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
