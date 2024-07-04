const path = require("path");
const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
const knexConfig = require("../knexfile"); // Adjust the path based on your project structure
const knex = require("knex")(knexConfig.development); // Adjust the environment as per your configuration

// Endpoint to read Excel and insert data into MySQL
router.post("/upload", async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "./../contactsBulkTest.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const xlData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    // Perform chunked inserts
    const chunkSize = 100; // Number of records to insert per chunk
    for (let i = 0; i < xlData.length; i += chunkSize) {
      const chunk = xlData.slice(i, i + chunkSize);
      await knex.batchInsert("data", chunk); // Replace 'data' with your actual table name
    }

    res.status(200).send("Data inserted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while inserting data");
  }
});

module.exports = router;
