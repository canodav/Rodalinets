export type Station = {
    id: number;
    name: string;
    latitude?: number;
    longitude?: number;
    index: number
}

export type SelectInputProps = {
    data: Array<any>,
    placeholder: string,
    label: string,
    style?: any,
    value: Station | null,
    onSelect: (station: Station) => void
}

export type TrainArrival = {
    id: number;
    trainId: number;
    departure_time: string;
    real_departure_time: string;
    direction: number;
    StationId: number;
    arrival_time: string,
    estimated_arrival_time: string
}


