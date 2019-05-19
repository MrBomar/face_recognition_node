const signIn = (req, res, knex, bcrypt) => {
    knex.select('email','hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data=>{
        if(bcrypt.compareSync(req.body.password, data[0].hash)){
            knex.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err=>res.status(400).json('Could not sign in'));
        }
    })
    .catch(err=>res.status(400).json('Could not sign in'));
}

module.exports = {
    signIn: signIn
}