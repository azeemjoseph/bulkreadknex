/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("firstName", 255).notNullable();
    table.string("lastName", 255).notNullable();
    table.string("mobilePhone", 15).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("contacts");
};
