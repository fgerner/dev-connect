const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

//@route GET api/auth
// @desc Authenticate user and get token
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//@route POST api/auth
// @desc Register user
// @access Public
router.post('/', [
        check('email', 'Use a valid email').isEmail(),
        check('password', 'Password needs to bee entered').exists()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        } else {
            const {email, password} = req.body;
            try {
                //see if user exists
                let user = await User.findOne({email});
                if (!user) {
                    return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
                };

                const isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) {
                    return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
                };

                //return web token
                const payload = {
                    id: user.id
                }
                jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 90000}, (err, token) => {
                    if (err) throw err;
                    res.json({token});
                });

                // return res.status(201).send('User created');
            } catch (e) {
                console.log(e.message);
                return res.status(500).send('Server error');
            }
        }
    }
)

module.exports = router;