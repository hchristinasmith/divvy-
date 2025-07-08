/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('targets').del()

  // Inserts seed entries
  await knex('targets').insert([
    {
      user_id: 1,
      id:1,
      category: 'Housing',
      target_amount: 1200.0,
      period: 'monthly',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 1,
      id:2,
      category: 'Food',
      target_amount: 500.0,
      period: 'monthly',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: 2,
      id:3,
      category: 'Entertainment',
      target_amount: 150.0,
      period: 'monthly',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ])
}
