const profile = (req, res, knex) => {
    const  {id} = req.params;
    knex.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('cannot retrieve profile');
        }
    })
    .catch(err=>{
        res.status(400).json('cannot retrieve profile')
    })
}

module.exports = {
    profile: profile
}