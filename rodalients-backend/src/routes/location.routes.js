import express from 'express';
import { createLocation, getLocations } from '../controllers/location.controller.js';

const router = express.Router();

router.post('/', createLocation);
router.get('/', getLocations);


const locationRouter = router;
export default locationRouter;
