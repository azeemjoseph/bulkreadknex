const path = require("path");
const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
const knexConfig = require("../knexfile"); // knex config file
const knex = require("knex")(knexConfig.development); // knex object

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
      await knex.batchInsert("data", chunk); // batch insert with knex object ( note objection js not wokring with mysql)
    }

    res.status(200).send("Data inserted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while inserting data");
  }
});

module.exports = router;
