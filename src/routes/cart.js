const express = require('express');
const router =  express.Router();

const CartController = require('../app/controllers/CartController');



router.post('/deleteInListCart',CartController.deleteInListCart);
router.get('/buyImediately/:id',CartController.buyImediately);
router.get('/distroyBill/:id',CartController.distroyBill);
router.post('/storeBill',CartController.storeBill);
router.post('/buyItemChoosed',CartController.buyItemChoosed);
router.get('/add/:id',CartController.getProduct);
router.get('/destroyItemCart/:id',CartController.DestroyItemCart);
router.get('/detailCart',CartController.detailCart);

module.exports = router;

