/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("data", function (table) {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastName");
    table.string("mobilePhone");
    // Add more columns as needed
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("data");
};
