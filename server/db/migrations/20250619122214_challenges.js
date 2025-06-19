/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('user_challenges', (table) => {
    table.string('id').primary()
    table.integer('user_id').unsigned().notNullable()
    table.string('challenge_id').notNullable()
    table.string('status', 50)
    table.integer('progress') // percent 0-100
    table.timestamp('started_at')
    table.timestamp('completed_at')

    table.foreign('user_id').references('users.id').onDelete('CASCADE')
  })
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('user_challenges')
}
