
const express = require('express');
const router = express.Router();

const {
    getSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
} = require('../controllers/sensorController');

router.get('/', getSensors);
router.get('/:id', getSensorById);
router.post('/', createSensor);
router.put('/:id', updateSensor);
router.delete('/:id', deleteSensor);

module.exports = router;
