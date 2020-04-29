const handleRegisterUser = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hashedPassword,
            email: email
        })
        .into('logins')
        .returning('email')
        .then(loginEmail => {
            return trx.insert({
                    name: name,
                    email: loginEmail[0],
                    datejoined: new Date()
                })
                .into('users')
                .returning('*')
                .then(user => {
                    res.json(user[0]);
                });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('Unable to register'));
};

module.exports = {
    handleRegisterUser
}