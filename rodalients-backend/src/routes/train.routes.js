import express from 'express';
import {
    getTrainPosition,
} from '../controllers/train.controller.js';

const router = express.Router();


router.get('/', getTrainPosition);

const trainRouter = router;
export default trainRouter;
