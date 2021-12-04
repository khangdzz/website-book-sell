const express = require('express');
const route = express.Router();

const homeController = require('../app/controllers/HomeController');


route.get('/search/:slug',homeController.searchToList);
route.get('/sortPopular',homeController.sortPopular);
route.get('/sortPriceDes',homeController.sortPriceDes);
route.get('/sortPriceAsc',homeController.sortPriceAsc);
route.get('/maxSold',homeController.maxSold);
route.get('/searchBook',homeController.searchBook);
route.post('/searchBook',homeController.searchBook);
route.get('/:page?',homeController.homeShowBook);

module.exports = route;
