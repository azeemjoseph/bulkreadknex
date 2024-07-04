const express = require("express");
const knex = require("knex");
const { Model } = require("objection");
const knexConfig = require("./knexfile").development;
const dataRoutes = require("./routes/data");

const app = express();
const db = knex(knexConfig);
Model.knex(db);

app.use(express.json());
app.use("/data", dataRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
