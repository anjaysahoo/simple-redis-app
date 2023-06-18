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

    /**
     * 1. Check if photos for the given albumId is present in the cache.
     * 2. If yes, then return the response from the cache.
     * 3. If not, then fetch the response from the API and store it in the cache for future use.
     * 4. Here using albumId in key makes sure that we are
     *    caching photos for each album separately.
     */
    const photos = await redisClient.get(`photos?albumId=${albumId}`);

    if (photos != null) {
        console.log("cache hit");
        return res.json(JSON.parse(photos));
    }

    const {data} = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        {params: {albumId}}
    );

    await redisClient.setEx(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data));
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


