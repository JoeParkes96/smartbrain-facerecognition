const express = require('express');
const cors = require('cors');
// TODO: use bcrypt to encrypt passwords once database is set up
// const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// Hard coded data to be replaced once DB is linked
const database = {
    users: [
        {
            id: '123',
            name: 'Joseph',
            email: 'joseph123@gmail.com',
            password: 'supersecret',
            submissions: 0,
            dateJoined: new Date()
        },
        {
            id: '456',
            name: 'Anna',
            email: 'anna6@gmail.com',
            password: 'password1',
            submissions: 0,
            dateJoined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if(checkUserCredentials(email, password)) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('incorrect credentials');
        }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        submissions: 0,
        dateJoined: new Date()
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = getFoundUser(id);
    if(user !== undefined) {
        return res.json(user);
    } else {
        res.status(404).json('user not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = getFoundUser(id);
    if(user !== undefined) {
        user.submissions++;
        return res.json(user.submissions);
    } else {
        res.status(404).json('user not found');
    }
})

app.listen(3000, () => {
    console.log('App is running');
});

// We know users so IDs are unique, will error check in future once linked to DB
getFoundUser = (userId) => {
    let foundUser = undefined;
    database.users.forEach(user => {
        if (user.id === userId) {
            foundUser = user;
        }
    });

    return foundUser;
} 

// Check password against hashed using bcrypt once DB is linked
checkUserCredentials = (inputEmail, inputPassword) => {
    const {email, password} = database.users[0];
    if(email === inputEmail && password === inputPassword) {
        return true;
    } else {
        return false;
    }
}