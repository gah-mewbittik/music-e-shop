const validateId = (req, res, next) => {
    const checkId = req.params.id;

    if(!/^\d+$/.test(checkId)){
        return res.status(400).json({message: 'Invalid ID Format'})
    }
    next();

}

module.exports = validateId;