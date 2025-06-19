/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('wishlist_items').del()

  // Inserts seed entries
  await knex('wishlist_items').insert([
    {
      user_id: 1,
      name: 'MacBook Pro 14-inch',
      target_amt: 2399,
      saved_amt: 1200,
      priority: 'high',
      url: 'https://example.com/macbook-pro-14',
      img_url: 'https://example.com/macbook-image.jpg',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      user_id: 1,
      name: 'Winter Coat',
      target_amt: 299,
      saved_amt: 250,
      priority: 'medium',
      url: 'https://example.com/winter-coat',
      img_url: 'https://example.com/wintercoat-image.jpg',
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ])
}
