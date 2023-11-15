import express from "express";
import cors from 'cors'
import morgan from "morgan";
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import travelRouter from "./routes/travel.routes.js";
import locationRouter from "./routes/location.routes.js";

import {Travel, Location} from './models/index.js'
import trainRouter from "./routes/train.routes.js";

// Init server
const app = express();

// Middleware
app.use(cors());
app.use(express.json())
app.use(morgan('common'))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public/')))


app.use("/travel", travelRouter);
app.use("/location", locationRouter);
app.use("/train", trainRouter);

app.listen(80, () => {
    console.log(`Server is running on port 80`);
})

