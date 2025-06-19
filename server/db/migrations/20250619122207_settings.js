/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('settings', (table) => {
    table.string('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.string('key', 255).notNullable()
    table.string('value', 1000)
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('user_id').references('users.id').onDelete('CASCADE')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('settings')
}
