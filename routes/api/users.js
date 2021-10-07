const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const { body } = require('express-validator');

// Controllers
const userController = require('../../controller/user.controller');
const serviceProviderController = require('../../controller/serviceProvider.controller');


// @Route           /user/general
// @Description     Register general user
// @Access          Public
router.post(
    '/general',
    [
        body('full_name', 'Full name must be string and its required').not().isEmpty(),
        body('phone_number', 'Phone number is required with country code').isLength({ min: 5 }),
    ],
    userController.registerUser
)


// @Route           /user/general/:id
// @Description     Update general user
// @Access          Public
router.put(
    '/general/:phone_number', 
    userController.updateUser
);


// @Route           /user/service-providers
// @Description     Register service provider
// @Access          Admin
router.post(
    '/service-provider',
    serviceProviderController.registerUser
)




// @Route           /user/service-providers/:identity_card_no
// @Description     Update service provider user
// @Access          Admin
router.put(
    '/service-provider/:identity_card_no', 
    serviceProviderController.updateUser
);

// @Route           /users
// @Description     Get all the users
// @Access          Admin
router.get(
    '/',
    userController.getUsers
);
// @Route           /users/:id
// @Description     Get all the users
// @Access          Admin
router.get(
    '/:_id',
    userController.getUserById
);

module.exports = router;