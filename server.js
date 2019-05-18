const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Im@Work2019',
        database: 'smart-brain'
    }
});

const SignIn = require('./controlers/SignIn');
const Register = require('./controlers/Register');
const Profile = require('./controlers/Register');
const Image = require('./controlers/Image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res) => SignIn.signIn(req, res, knex, bcrypt))
app.post('/register', (req, res)=> Register.register(req, res, knex, bcrypt))
app.get('/profile/:id', (req, res) => Profile.Profile(req, res, knex))
app.put('/image', (req, res) => Image.image(req, res, knex));
app.post('/imageurl', (req, res) => Image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${LISTENING_PORT}`)
});