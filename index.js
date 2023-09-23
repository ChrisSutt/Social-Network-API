const db = require("./config/connection");
const express = require("express");
const routes = require("./routes");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once ("open", () => {
    app.listen(PORT, () => {
        console.log (`API server running on port ${PORT}!`);
    });
});