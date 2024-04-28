const router = require("express").Router();

const Car = require("./carRouter.js");

router.use("/api/v1/cars", Car);

module.exports = router;
