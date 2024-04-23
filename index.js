import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

try {
    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });
} catch (error) {
    console.log(error);
}
