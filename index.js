import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/reviews", async (req, res) => {
    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${process.env.PLACE_NAME}&inputtype=textquery&fields=place_id&key=${process.env.GOOGLE_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            const placeId = data.candidates[0].place_id;

            fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${process.env.GOOGLE_API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    return res.status(200).json({
                        success: true,
                        data: data.result.reviews,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        });
});

try {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port ${process.env.PORT || 3000}`);
    });
} catch (error) {
    console.log(`Server inizialization error: ${error}`);
}
