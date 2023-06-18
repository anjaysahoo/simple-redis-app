import express from 'express';
import axios from "axios";
import cors from 'cors';
import {createClient} from 'redis';

const DEFAULT_EXPIRATION = 3600;

const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get("/photos", async (req, res) => {
        const albumId = req.query.albumId;

        const photos = await redisClient.get("photos");

        if (photos != null) {
            console.log("cache hit");
            return res.json(JSON.parse(photos));
        }

        const {data} = await axios.get(
            "https://jsonplaceholder.typicode.com/photos",
            {params: {albumId}}
        );

        await redisClient.setEx("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
        console.log("cache miss");
        res.json(data);
    }
);

app.get("/photos:id", async (req, res) => {
        const {data} = await axios.get(
            "https://jsonplaceholder.typicode.com/photos",
            {params: {id}}
        );
        res.json(data);
    }
);

app.listen(3000, () => {
        console.log("Server running on port 3000");
    }
);


