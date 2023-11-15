import express from 'express';
import {
    getTravelByUserId,
    createTravel,
    updateTravel,
} from '../controllers/travel.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is the root route of the travel section.');
});

router.get('/:id', getTravelByUserId);
router.post('/', createTravel);
router.put('/:id', updateTravel);

const travelRouter = router;
export default travelRouter;
