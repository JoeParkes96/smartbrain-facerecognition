const Clarifai = require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: 'fb6166db2fa24710b76d6c4934536353'
   });

const handleClarifaiApiCall = (req, res) => {
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to connect to API'));
};


const handleSubmitImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('submissions', 1)
        .returning('submissions')
        .then(submissions => res.json(submissions[0]))
        .catch(err => res.status(400).json('Unable to get submissions'));
};

module.exports = {
    handleSubmitImage,
    handleClarifaiApiCall
}