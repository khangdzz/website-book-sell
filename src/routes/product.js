const express = require('express');
const router =  express.Router();

const ProductController = require('../app/controllers/ProductController');


router.post('/comment',ProductController.comment);
router.get('/detailBook/:id',ProductController.show);

module.exports = router;

