/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table('transactions', (table) => {
    table.string('cycle').nullable() // monthly, weekly, yearly, etc.
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.table('transactions', (table) => {
    table.dropColumn('cycle')
  })
}
