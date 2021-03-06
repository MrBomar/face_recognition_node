const register = (req, res, knex, bcrypt) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
            .returning('*')
            .insert(
                {
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                }
            )
            .then(user=>{
                console.log(user[0]);
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(err => {
            trx.rollback;
        })
    })
    .catch(err => res.setMaxListeners(400).json('Unable to register.'));
}

module.exports = {
    register: register
}