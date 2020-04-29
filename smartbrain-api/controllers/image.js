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
    handleSubmitImage
}