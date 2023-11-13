import { Location, Travel } from '../models/index.js';
import * as locationService from '../services/location.services.js';

export const createLocation = async (req, res) => {
    const params = req.query;
    if (!params.id) {
        res.status(400).json({ message: "No departure or arrival station provided" });
        return;
    }
    try {
        const travelId = Number(params.id);
        const travelExists = await Travel.findByPk(travelId);

        if (!travelExists) {
            res.status(404).json({ message: `Travel record with id ${travelId} not found` });
            return;
        }

        const travel = await locationService.createLocation(travelId, params.latitude, params.longitude)
        res.status(200).json({ id: travel?.id });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getLocations = async (req, res) => {
    try {
        const { travelId } = req.query;
        if(!travelId){
            res.status(404).json({ message: `No travelId provided` });
            return;
        }
        const locations = await locationService.getTravelLocations(travelId);
        res.status(200).json(locations)
    }
    catch(error) {
        res.status(400).json({ error: error.message });
    }
}
