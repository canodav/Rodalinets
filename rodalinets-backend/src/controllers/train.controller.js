import * as trainService from '../services/train.services.js';

export const getTrainPosition = async (req, res) => {
    const coords = trainService.getTrainPosition();
    res.status(200).json({coords});
}