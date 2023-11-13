import * as travelService from '../services/travel.services.js';

export const getTravelByUserId = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "No ID provided" });
        return;
    }
    try {
        const travels = await travelService.getTravelByUserId(id);
        res.status(200).json(travels);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createTravel = async (req, res) => {
    const { fromStation, toStation, userId } = req.query;
    if (!fromStation || !toStation || !userId) {
        res.status(400).json({ message: "No departure or arrival station provided" });
        return;
    }
    try {
        const travel = await travelService.createTravel(fromStation, toStation, userId);
        res.status(200).json({ id: travel?.id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateTravel = async (req, res) => {
    const { id } = req.params;
    const { endTime } = req.body;

    if (!id || !endTime) {
        res.status(400).json({ message: "Incomplete information provided for updating travel record" });
        return;
    }

    try {
        const travel = await travelService.updateTravel(id, endTime);

        if (!travel) {
            res.status(404).json({ message: "Travel record not found" });
            return;
        }

        res.status(200).json({ message: "Travel record updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
