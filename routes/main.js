const express = require("express");
const router = express.Router();

router.get("/orders", (req, res) => {
    return res.render("orders.pug");
});
router.get("/order/:locator", (req, res) => {
    return res.render("order.pug", {
        locator: req.params.locator
    });
});

module.exports = router;