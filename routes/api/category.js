const express = require('express');
const router = express.Router();

const controller = require('../../controller/category.controller');


// @Route           /category
// @Description     Register category
// @Access          admin
router.post(
    '/',
    controller.register
)

// @Route           /category/:id
// @Description     Update category
// @Access          Admin
router.put(
    '/:id', 
    controller.update
);

// @Route           /category
// @Description     Get all categories
// @Access          admin
router.get(
    '/', 
    controller.getAll
);


// @Route           /category
// @Description     Get active categories
// @Access          Public
router.get(
    '/actives', 
    controller.getActives
);


// @Route           /categorry/:id
// @Description     Get category by id
// @Access          Admin
router.get(
    '/:id',
    controller.getById
)



// @Route           /category/:id
// @Description     Delete category
// @Access          Admin
router.delete(
    '/:id', 
    controller.remove
);

module.exports = router;