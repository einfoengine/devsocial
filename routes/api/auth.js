const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');


const User = require('../../models/User.model');

// @route   GET api/auth
// @desc    Authenticate user and get token 
// @access  Public

router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('password');
        res.json(user);
    }catch(err){
        console.log(err);
    }
    // res.send('Auth rout');
});


// @route   POST api/auth
// @desc    Register Users
// @access  Public

router.post(
    '/',
    // express-validator
    [
        // If a valid email address
        body('email', 'Please enter a valid email').isEmail(),
        // Password if exist
        body('password', 'Please enter a valid password').exists(),
    ],
    // Action
    async (req, res)=>{
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure the request
        const {email, password} = req.body;
        /* N. B. Model must be included in the script */

        try{
            // Check if the user exist
            let user = await User.findOne({email});
            // Through error if the user found.
            if(!user){
                res.status(400).json({errors: [{message: 'Invalid user credintial'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            // console.log(isMatch);
            if(!isMatch){
                res.status(400).json({errors: [{message: 'Invalid user credintial'}]})
            }

            // Return json web-token
            const payload = {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
            // console.log('config', config.get('jwtSecret'));
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token)=>{
                if(err){
                    throw err;
                }
                res.json({token})
            });

            console.log('** Request - ', req.body);
            // res.send("User registration successful!");
        }catch(err){
            console.log('Registration error - ', err)
            res.status(500).send('Server error');
        }
    }
);


module.exports = router;