import { Travel } from '../models/index.js';
import {getTravelLocations} from './location.services.js'

export const getTravelByUserId = async (userId) => {
    try {
        const travels = await Travel.findAll({ where: { userId } });
        const travelsWithLocationCount = await Promise.all(travels.map(async (travel) => {
            const locations = await getTravelLocations(travel.id);
            return {
                ...travel.get({ plain: true }),
                locationCount: locations.length
            };
        }));

        return travelsWithLocationCount;
    } catch (error) {
        throw error;
    }
}

export const createTravel = async (fromStation, toStation, userId) => {
    try {
        const travel = await Travel.create({
            fromStation,
            toStation,
            startTime: new Date(),
            userId,
        });
        return travel;
    } catch (error) {
        throw error;
    }
}

export const updateTravel = async (id, endTime) => {
    try {
        const travel = await Travel.findByPk(id);
        if (!travel) return null;
        travel.endTime = new Date(endTime);
        await travel.save();
        return travel;
    } catch (error) {
        throw error;
    }
}
