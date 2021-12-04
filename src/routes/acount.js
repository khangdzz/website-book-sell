const express = require('express');
const router =  express.Router();

const acountController = require('../app/controllers/AcountController');

router.post('/registerPost',acountController.registerPost);
router.post('/LoginPost', acountController.LoginPost);
router.get('/logOut', acountController.logOut);
router.get('/register', acountController.register);
router.get('/login', acountController.login);
router.put('/update/:id', acountController.update);
router.get('/:invoice', acountController.show);
router.get('/', acountController.show);

module.exports = router;

