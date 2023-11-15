
import * as turf from '@turf/turf';

const stations = [
    [2.4454458, 41.533679],
    [2.4013433, 41.506864],
    [2.3897035, 41.5005719],
    [2.3540806, 41.487645],
    [2.3200155, 41.4788285]
];

  
export const getTrainPosition = () => {
    const roundTripStations = stations.concat(stations.slice(0, -1).reverse());
    const line = turf.lineString(roundTripStations);
    const trainSpeed = 2000;

    const currentTime = Date.now();
    const startTime = process.startTime || currentTime;
    process.startTime = startTime;
    
    const elapsedTime = (currentTime - startTime) / (1000 * 60 * 60); 
    const distanceTraveled = elapsedTime * trainSpeed;
    
    const totalLineDistance = turf.length(line, {units: 'kilometers'});
    const traveledDistance = distanceTraveled % totalLineDistance;
    
    const trainPosition = turf.along(line, traveledDistance, {units: 'kilometers'});
    
    return trainPosition.geometry.coordinates;
}


