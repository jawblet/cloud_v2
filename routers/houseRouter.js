const express = require('express');
const router = express.Router();
const houseController = require('./../controllers/houseController');

router.get('/', houseController.getAllHouses);
router.post('/', houseController.createHouse);
router.get('/:id', houseController.getHouseById);
router.put('/:id', houseController.updateHouse);
router.get('/h/:houseName', houseController.getHouseByHouseName);
router.get('/u/:userId', houseController.getHouseByUser);
router.delete('/:id', houseController.deleteOneHouse);
router.delete('/', houseController.deleteAllHouses);

module.exports = router;