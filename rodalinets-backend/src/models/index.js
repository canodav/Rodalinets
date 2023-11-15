import { Travel } from "./travel.model.js";
import { Location } from "./location.model.js";
import { Train } from "./train.model.js";
import { Station } from './station.model.js'

Travel.hasMany(Location);
Station.hasMany(Train)

Travel.sync({ alter: true })
Location.sync({ alter: true })
Train.sync({ alter: true })
Station.sync({ alter: true })

export {Travel, Location, Train, Station}