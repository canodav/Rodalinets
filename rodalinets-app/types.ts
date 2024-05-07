export type Station = {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  index: number;
};

export type nearestStation = Station & { distance: number };

export type SelectInputProps = {
  data: Array<any>;
  placeholder: string;
  label: string;
  style?: any;
  value: Station | null;
  onSelect: (station: Station | null) => void;
  nearestStationOption?: boolean;
};

export type FuzzySelectInputProps = {
  data: Array<any>;
  placeholder: string;
  label: string;
  style?: any;
  value: Station | null;
  onSelect: (station: Station) => void;
  nearestStationOption?: boolean;
};

export type TrainArrival = {
  id: number;
  trainId: number;
  departure_time: string;
  estimated_departure_time: string;
  direction: number;
  StationId: number;
  arrival_time: string;
  estimated_arrival_time: string;
  isPastTrain: boolean;
  Train: any;
  incidenceReports: Array<any>,
  incidenceReportCount: number,
  occupancy: Array<any>,
  noInfo?: boolean
};

export type Location = {
  latitude: number;
  longitude: number;
  timestamp?: string;
};
