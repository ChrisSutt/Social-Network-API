const router = require("express").Routed();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("404");
});

module.exports = router;