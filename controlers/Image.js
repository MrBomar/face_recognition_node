const clarifai = require('clarifai')

const app = new clarifai.App({
    apiKey: "685450f6661742ea9fcdcdf2c489db32"
})

const handleApiCall = (req, res) => {
    app.models
        .predict(clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to connect to API'));
}

const image = (req, res, knex) => {
    const {id} = req.body;
    knex('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries=>{
            if(entries.length){
                res.json(entries[0])
            } else {
                res.status(400).json('profile could not be updated')    
            }
        })
        .catch(err =>{
            res.status(400).json('profile could not be updated')
        })
}

module.exports = {
    image,
    handleApiCall
}