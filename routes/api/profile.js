const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   Get api/profile/user
// @desc    Get current user profile
// @access  Public

router.get('/user', auth, async (req, res)=>{

    try{
        console.log('->',req);
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            res.status(400).json({msg: 'Invalid profile'});
        }
        res.json(profile);
    }catch(err){
        console.error(err);
        res.status(500).send('500 Server error - ', err);
    }

    console.log('Authentication successful');
    res.send('User profile route');
});

// @route   POST api/profile/user
// @desc    Create or update user profile
// @access  Public

router.post(
    '/',
    [
        body('status', 'Status is required').not().isEmpty(),
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                errors: errors.array()
            })
        }
        const {name, website, bio, } = req.body;
    }
)

module.exports = router;