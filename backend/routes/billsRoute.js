const express = require("express");
const {
    addBillsController,
    getBillsController,
} = require("./../controllers/billsController");

const router = express.Router();

//Method - post
router.post("/add-bills", addBillsController);

//MEthod - POST
router.get("/get-bills", getBillsController);

module.exports = router;