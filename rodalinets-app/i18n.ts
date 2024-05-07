import { View, StyleSheet, Text } from 'react-native';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


const translations = {
  en: {
    last_update: 'Last update',
    estimated_departure_time: 'Estimated departure time',
    fetch_timetables_error: 'Failed to fetch timetables:',
    scheduled_arrival_time: 'Scheduled arrival time',
    occupation_level: 'Occupation Level',
    occupancy_descriptions: ['', "It's almost empty: plenty of seats available.", 'Not too crowded: Some seats available.', 'Quite full: few seats and little space to stand.', 'Almost completely full: Little space to stand.', 'Full: no more passengers allowed.'],
    departure_station_placeholder: 'Select a departure station',
    departure_station_label: 'Departure Station',
    destination_station_placeholder: 'Select a destination station',
    destination_station_label: 'Destination Station',
    notify_incident: 'Notify an incident',
    departure_time_label: 'Departure time',
    arrival_time_label: 'Arrival time',
    occupation_level_title: 'Occupation Level',
    no_occupancy_info: "No user has provided information on this train's occupancy.",
    info_provided_by_one_user: "This information has been provided by 1 user.",
    info_provided_by_multiple_users: "This information has been provided by {count} users.",
    travel_id: 'Travel ID:',
    travel_time: 'Travel Time:',
    number_of_contributions: 'Number of Contributions:',
    start_travel: 'Start Travel',
    end_travel: 'End Travel',
    no_info_text: 'Rodalinets does not have information about this train'
  },

  ca: {
    last_update: 'Darrera actualització',
    estimated_departure_time: "Hora d'arribada estimada",
    fetch_timetables_error: 'Error en obtenir els horaris:',
    scheduled_arrival_time: "Hora d'arribada programada",
    occupation_level: "Nivell d'ocupació",
    occupancy_descriptions: ['', 'Està gairebé buit: molts seients lliures.', 'No hi ha massa gent: Alguns seients disponibles.', 'Bastant ple: pocs seients i poc espai per estar dret.', 'Està pràcticament ple: Poc espai per estar dret.', 'Ple: no accepta més passatgers'],
    departure_station_placeholder: 'Selecciona una estació de sortida',
    departure_station_label: 'Estació de sortida',
    destination_station_placeholder: 'Seleccioneu una estació de destinació',
    destination_station_label: 'Estació destinació',
    notify_incident: 'Notificar una incidència',
    departure_time_label: 'Hora de sortida',
    arrival_time_label: 'Hora d\'arribada',
    occupation_level_title: 'Nivell d\'ocupació',
    no_occupancy_info: "Cap usuari ha aportat informació de l'ocupació d'aquest tren",
    info_provided_by_one_user: "Aquesta informació ha estat proporcionada per 1 usuari.",
    info_provided_by_multiple_users: "Aquesta informació ha estat proporcionada per {count} usuaris.",  
    travel_id: 'ID de viatge:',
    travel_time: 'Temps de viatge:',
    number_of_contributions: 'Número d\'aportacions a Rodalinets:',
    start_travel: 'Començar Viatge',
    end_travel: 'Finalitzar Viatge',
    no_info_text: 'Rodalinets no conté informació sobre aquest tren'

  },
  'es-ES': {
    last_update: 'Última actualización',
    estimated_departure_time: 'Hora de llegada estimada',
    fetch_timetables_error: 'Fallo al obtener los horarios:',
    scheduled_arrival_time: 'Hora de llegada programada',
    occupation_level: 'Nivel de ocupación',
    occupancy_descriptions: ['', 'Está casi vacío: muchos asientos disponibles.', 'No está muy lleno: Algunos asientos disponibles.', 'Bastante lleno: pocos asientos y poco espacio para estar de pie.', 'Casi completamente lleno: Poco espacio para estar de pie.', 'Lleno: no se admiten más pasajeros'],
    departure_station_placeholder: 'Selecciona una estación de salida',
    departure_station_label: 'Estación de salida',
    destination_station_placeholder: 'Selecciona una estación de destino',
    destination_station_label: 'Estación destino',
    notify_incident: 'Notificar un incidente',
    departure_time_label: 'Hora de salida',
    arrival_time_label: 'Hora de llegada',
    occupation_level_title: 'Nivel de ocupación',
    no_occupancy_info: "Ningún usuario ha proporcionado información sobre la ocupación de este tren.",
    info_provided_by_one_user: "Esta información ha sido proporcionada por 1 usuario.",
    info_provided_by_multiple_users: "Esta información ha sido proporcionada por {count} usuarios.",
    travel_id: 'ID del viaje:',
    travel_time: 'Tiempo de viaje:',
    number_of_contributions: 'Número de contribuciones:',
    start_travel: 'Comenzar Viaje',
    end_travel: 'Finalizar Viaje',
    no_info_text: 'Rodalinets no contiene información sobre este tren'
  },
};
const i18n = new I18n(translations);

i18n.locale = Localization.locale;

console.log(Localization.locale);

i18n.enableFallback = true;

export default i18n;
