const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 4000;


app.use(cors());
// MongoDB connection URL
const mongoURI = 'mongodb+srv://pranav:pranav@cluster0.fw3ns.mongodb.net/portfolio'; // replace 'your_database_name' with your actual DB name

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());


const githubSchema = new mongoose.Schema({
    id:{type:Number},
    name: { type: String, required: true },
    data: { type: String, required: true },
    
  });
  
  // Create a model for the schema
  const Github = mongoose.model('gitdata', githubSchema);
  
  // Middleware
  app.use(express.json());
  
  // API endpoint to retrieve all documents from 'github' collection
  app.get('/api/github', async (req, res) => {
    try {
      const data = await Github.find();
      console.log("data",data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data' });
    }
  });
// Define routes
app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
