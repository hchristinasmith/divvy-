/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('wishlist_items', (table) => {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('name', 255).notNullable()
    table.integer('target_amt').notNullable()
    table.integer('saved_amt').defaultTo(0)
    table.string('priority', 50)
    table.string('url', 1000)
    table.string('img_url', 1000)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('wishlist_items')
}
