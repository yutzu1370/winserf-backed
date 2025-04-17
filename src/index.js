require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(
  cors()
);
app.use(express.json());

const todosRouter = require('./todos');

// Health check
app.get('/', (req, res) => {
  res.send('Todolist API is running');
});

app.use('/todos', todosRouter);

// TODO: Implement /todos CRUD endpoints here

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
