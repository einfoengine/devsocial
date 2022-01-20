/*
* Imports
*/
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const auth = require('../../middlewares/auth');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User.model');

// Controllers
// const userController = require('../../controller/user.controller');
// const serviceProviderController = require('../../controller/serviceProvider.controller');

router.get('/',(req, res)=>{res.send("User route found!")});

// @Route           /user/general
// @Description     Register general user
// @Access          Public
router.post(
    '/general',
    [
        body('full_name', 'Full name must be string and its required').not().isEmpty(),
        body('phone_number', 'Phone number is required with country code').isLength({ min: 5 }),
        body('email', 'Email is required').isEmail(),
        body('password', 'Password is required').not().isEmpty()
    ],
    // userController.registerUser
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                errors: errors.array()
            });
        }
        const {full_name, phone_number, password, email} = req.body;
        try {
            let user = await User.findOne({email});
            if(user){
                res.status(401).json({
                    errors: [{msg: 'Registration failed. User already exist!'}]
                });
            }
            const avater = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            user = new User({
                full_name,  
                phone_number,
                email, 
                avater,
                password
            });
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash("qqwergdfgd", salt);

            await user.save();
            
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token)=>{
                    if(err) throw err;
                    res.json({
                        token
                    });
                }
            );

        } catch (err) {
            console.log('Server error: ',err);
            res.status(err.response.status).send('Server error');
            // res.send('Server error');
        }
    }
)


// @Route           /user/general/:id
// @Description     Update general user
// @Access          Public
// router.put(
//     '/general/:phone_number', 
//     userController.updateUser
// );


// @Route           /user/service-providers
// @Description     Register service provider
// @Access          Admin
// router.post(
//     '/service-provider',
//     serviceProviderController.registerUser
// )




// @Route           /user/service-providers/:identity_card_no
// @Description     Update service provider user
// @Access          Admin
// router.put(
//     '/service-provider/:identity_card_no', 
//     serviceProviderController.updateUser
// );

// @Route           /users
// @Description     Get all the users
// @Access          Admin
// router.get(
//     '/',
//     userController.getUsers
// );
// @Route           /users/:id
// @Description     Get all the users
// @Access          Admin
// router.get(
//     '/:_id',
//     userController.getUserById
// );

module.exports = router;
