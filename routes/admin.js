const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-thing => GET
router.get('/add-thing', adminController.getAddThing);

// admin/add-feature=> GET

router.get('/add-feature', adminController.getaddFeutures)

// /admin/things => GET
router.get('/things', adminController.getThings);

// /admin/add-thing => POST
router.post('/add-thing', adminController.postAddThing);

router.get('/edit-thing/:thingId', adminController.getEditThing);

router.post('/edit-thing', adminController.postEditThing);

router.post('/delete-thing', adminController.postDeleteThing);

module.exports = router;
