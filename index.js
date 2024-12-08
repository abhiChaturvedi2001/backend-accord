const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({});

const app = express();
const options = {
    origin: "https://accord-iq-assignment.vercel.app",
    credentials: true
}
app.use(cors(options));

const jsonFilePath = "./db.json";

// Serve the JSON file when a GET request is made to the root
app.get("/", (req, res) => {
    fs.readFile(jsonFilePath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file", error: err });
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (error) {
            res.status(500).json({ message: "Error parsing JSON data", error });
        }
    });
});

const port = process.env.PORT || 7080;
app.listen(port, () => {
    console.log("Server is running on port", port);
});
