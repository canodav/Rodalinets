import { Location, Travel } from '../models/index.js';

export const createLocation = async (travelId, latitude, longitude) => {
    const travelExists = await Travel.findByPk(travelId);

    if (!travelExists) {
        throw new Error(`Travel record with id ${travelId} not found`);
    }

    const location = await Location.create({ TravelId: travelId, latitude, longitude, time: new Date() });

    return location;
};


export const getTravelLocations = async (travelId) => {
    let locations = await Location.findAll({
        where: {
            travelId
        }
    })

    locations = locations.map(data => data.get({plain: true}))

    return locations;
}