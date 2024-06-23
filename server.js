const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // For all other routes, serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected Successfully!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
