const express = require("express");
const router = express.Router();

const orders = require("../controllers/order_controller.js");

router.get("/orders", orders.show);
router.get("/order/:locator", orders.locate);

module.exports = router;