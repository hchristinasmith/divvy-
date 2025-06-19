/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Clear existing entries
  await knex('user_challenges').del()

  // Insert sample user challenge entries
  await knex('user_challenges').insert([
    {
      id: 'uc-001',
      user_id: 1,
      challenge_id: '1',
      status: 'in_progress',
      progress: 40,
      started_at: new Date('2025-06-15T08:00:00Z'),
      completed_at: null,
    },
    {
      id: 'uc-002',
      user_id: 1,
      challenge_id: '2',
      status: 'completed',
      progress: 100,
      started_at: new Date('2025-06-01T08:00:00Z'),
      completed_at: new Date('2025-06-07T08:00:00Z'),
    },
    {
      id: 'uc-003',
      user_id: 2,
      challenge_id: '3',
      status: 'not_started',
      progress: 0,
      started_at: null,
      completed_at: null,
    },
  ])
}
