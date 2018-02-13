const express = require("express");
const router = express.Router();

router.get("/orders", orders.show);
router.get("/order/:locator", orders.locate);