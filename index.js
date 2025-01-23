const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

//JSON Middleware
app.use(express.json());

//Products route
app.use('/products', productRoutes)

//Main route
app.get('/', (req, res) => {
    res.send('API running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));