const express = require("express");
const app = express();
const port = 3000; // Choose a port for your server

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, this is your Express server!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
