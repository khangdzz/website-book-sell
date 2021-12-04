const express = require('express');
const route = express.Router();

const AdminController = require('../app/controllers/AdminController');


route.get('/AddItems',AdminController.AddItems);
route.post('/add',AdminController.add);
route.get('/managerItems',AdminController.managerItems);
route.get('/managerUser',AdminController.managerUser);
route.post('/update/:id',AdminController.updateItem);
route.get('/update/:id',AdminController.update);
route.delete('/distroy/:id',AdminController.distroy);
route.get('/detailBill/:id',AdminController.detailBill);
route.get('/confirmOrder/:id',AdminController.confirmOrder);
route.get('/complete/:id',AdminController.complete);

module.exports = route;
