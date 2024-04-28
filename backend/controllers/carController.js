const { Car } = require("../models");

// Get
const { Op } = require("sequelize");

const getCars = async (req, res) => {
  try {
    let cars;
    const search = req.query.search;
    const filter = req.query.filter;

    // Search
    if (search) {
      cars = await Car.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
      });
    } else {
      cars = await Car.findAll();
    }

    // Filter berdasarkan ukuran mobil jika ada nilai filter
    if (filter && filter !== "all") {
      cars = cars.filter((car) => car.size === filter);
    }

    res.status(200).json({
      status: "success",
      data: {
        totalData: cars.length,
        cars,
      },
    });
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

// Get by id
const getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        totalData: car.length,
        car,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Create
const createCar = async (req, res) => {
  try {
    let photo = null;
    if (req.file) {
      photo = req.imageUrl;
    }

    const carData = { ...req.body, photo };
    await Car.create(carData);
    res.status(200).json({
      status: "success",
      data: {
        totalData: carData.length,
        carData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update

// update

const updateCar = async (req, res) => {
  try {
    const existingPhoto = req.body.existing_photo;
    let newPhoto;
    if (req.file) {
      newPhoto = req.imageUrl;
    } else {
      // Jika tidak ada file baru, gunakan nama file yang sudah ada
      newPhoto = existingPhoto;
    }
    // Update data mobil, termasuk nama file foto baru atau yang sudah ada
    await Car.update(
      { ...req.body, photo: newPhoto }, // Gunakan nama file baru atau yang sudah ada
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const carUpdate = await Car.findByPk(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        totalData: carUpdate.length,
        carUpdate,
      },
    });
  } catch (err) {
    res.render("error.ejs", {
      message: err.message,
    });
  }
};

// Delete
const deleteCar = async (req, res) => {
  try {
    const car = await Car.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "berhasil delete data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
