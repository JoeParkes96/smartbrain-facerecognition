const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const imageController = require('./controllers/image');
const profileController = require('./controllers/profile');
const registerController = require('./controllers/register');
const rootController = require('./controllers/root');
const signInController = require('./controllers/signIn');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {rootController.handleRoot(req, res, db)});

app.post('/signin', (req, res) => {signInController.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {registerController.handleRegisterUser(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profileController.handleGetProfile(req, res, db)});

app.put('/image', (req, res) => {imageController.handleSubmitImage(req, res, db)});

app.post('/imageUrl', (req, res) => {imageController.handleClarifaiApiCall(req, res)});

app.listen(3000, () => {
    console.log('App is running');
});