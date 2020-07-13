const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
//    get token from header
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg: 'no token'});
    }
    ;
//    verify token
    try {
        jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            if (error) {
                res.status(401).json({msg: 'token is not valid'});
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
}