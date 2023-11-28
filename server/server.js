const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.post('/signup', async (req, res) => {
  try {
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ANOTHER ERROR' });
  }
});

app.post('/login', async (req, res) => {
  try {
    res.status(200).json({ token: 'your_generated_token', message: 'Logged in' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Username or password is incorrect' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ANOTHER ERROR' });
  }
});

app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Not the user' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.get('/order-history', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Not the user' });
    }

    const orders = user.orders;

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Generalized error' }); //change error
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());


  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();