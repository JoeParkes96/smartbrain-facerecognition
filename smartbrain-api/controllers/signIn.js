const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db.select('email', 'hash')
        .from('logins')
        .where('email', '=', email)
        .then(data => {
            const isValidCredentials = bcrypt.compareSync(password, data[0].hash);
            if (isValidCredentials) {
                return db.select('*')
                .from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json('Unable to get user'));
            } else {
                res.status(400).json('Incorrect credentials');
            }
        })
        .catch(err => res.status(400).json('Incorrect credentials'));
};

module.exports = {
    handleSignIn
}