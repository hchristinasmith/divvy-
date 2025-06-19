/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('targets', (table) => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('category', 255).notNullable() // e.g., 'Housing', 'Food', etc.
    table.decimal('target_amount', 14, 2).notNullable() // target amount for the category
    table.string('period', 50).notNullable() // e.g., 'monthly', 'yearly', or custom period
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.unique(['user_id', 'category', 'period']) // avoid duplicate targets for same category/period per user
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('targets')
}
