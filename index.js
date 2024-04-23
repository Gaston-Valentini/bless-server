import express from "express";

const app = express();

try {
    app.listen(3000, () => {
        console.log("Server listening on port 3000");
    });
} catch (error) {
    console.log(error);
}
