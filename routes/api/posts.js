const express = require('express');
const router = express.Router();


// @route   Get api/posts
// @desc    Posts route
// @access  Protected

router.get('/posts', async (req, res)=>{
    res.send('Posts route working');
});


module.exports = router;