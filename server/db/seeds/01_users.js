/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('users').del()
  await knex('users').insert([
    { id: 1, email: 'hannah@example.com', password: 'hashedpass1' },
    { id: 2, email: 'user2@example.com', password: 'hashedpass2' },
  ])
}
