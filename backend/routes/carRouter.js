const router = require("express").Router();

const car = require("../controllers/carController.js");
router.route("/").get(car.getCars).post(car.createCar);

router
  .route("/:id")
  .get(car.getCarById)
  .put(car.updateCar)
  .delete(car.deleteCar);

module.exports = router;
