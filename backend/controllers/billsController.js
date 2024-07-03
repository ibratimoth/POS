const billsModel = require("../models/billsModel");

// get items
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find();
    res.status(200).send(bills);
  } catch (error) {
    console.log(error);
  }
};

//add items
const addBillsController = async (req, res) => {
  try {
    const newBills = new billsModel(req.body);
    await newBills.save();
    res.status(201).send("bills Created Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};




module.exports = {
    addBillsController,
    getBillsController
};
