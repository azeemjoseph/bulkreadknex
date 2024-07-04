const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
const DataModel = require("../models/DataModel");

// Endpoint to read Excel and insert data into MySQL
router.post("/upload", async (req, res) => {
  try {
    // Replace with your actual path to the Excel file
    const workbook = xlsx.readFile("path_to_your_excel_file.xlsx");
    const sheet_name_list = workbook.SheetNames;
    const xlData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    await DataModel.query().insert(xlData);

    res.status(200).send("Data inserted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while inserting data");
  }
});

module.exports = router;
