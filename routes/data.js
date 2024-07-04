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

    // Specify the sheet name you want to read
    const sheetName = "5000contacts";
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      return res
        .status(400)
        .send(`Sheet "${sheetName}" not found in the Excel file.`);
    }

    const xlData = xlsx.utils.sheet_to_json(worksheet);

    // Array to collect primary keys
    let insertedIds = [];

    // Perform chunked inserts
    const chunkSize = 100; // Number of records to insert per chunk
    for (let i = 0; i < xlData.length; i += chunkSize) {
      const chunk = xlData.slice(i, i + chunkSize);

      // Insert chunk and retrieve primary keys
      await knex("data").insert(chunk);

      // Retrieve primary keys of the last inserted rows
      const lastId = await knex("data").orderBy("id", "desc").first();
      const firstId = lastId.id - chunk.length + 1;
      const chunkIds = Array.from(
        { length: chunk.length },
        (v, k) => firstId + k
      );

      insertedIds = insertedIds.concat(chunkIds);
    }

    res
      .status(200)
      .send({ message: "Data inserted successfully!", ids: insertedIds });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while inserting data");
  }
});

module.exports = router;
