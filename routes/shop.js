const path = require('path');

const express = require('express');

const shopController = require('../controllers/smartcampus');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/things', shopController.getThings);

router.get('/things/:thingId', shopController.getThing);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteThing);

router.post('/create-order', shopController.postSelection);

router.get('/orders', shopController.getSelections);

module.exports = router;
