/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('settings').del()

  // Inserts seed entries
  await knex('settings').insert([
    {
      id: 'setting-001',
      user_id: 1,
      key: 'dark_mode',
      value: 'true',
      updated_at: new Date(),
    },
    {
      id: 'setting-002',
      user_id: 1,
      key: 'currency',
      value: 'NZD',
      updated_at: new Date(),
    },
    {
      id: 'setting-003',
      user_id: 2,
      key: 'notifications',
      value: 'enabled',
      updated_at: new Date(),
    },
  ])
}
