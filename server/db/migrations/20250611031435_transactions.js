/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary()
    table.string('akahu_id').unique().notNullable()

    // Core transaction fields
    table.string('account_id')
    table.string('user_id')
    table.string('connection_id')
    table.timestamp('created_at', { useTz: true })
    table.timestamp('updated_at', { useTz: true })
    table.timestamp('date', { useTz: true })
    table.string('description')
    table.decimal('amount', 12, 2)
    table.decimal('balance', 12, 2)
    table.string('type')
    table.string('hash')

    // Category
    table.string('category_id')
    table.string('category_name')
    table.string('category_group_id')
    table.string('category_group_name')

    // Meta
    table.string('particulars')
    table.string('code')
    table.string('reference')
    table.string('other_account')
    table.string('logo')
    table.decimal('conversion_amount', 12, 2)
    table.decimal('conversion_currency', 12, 2)
    table.decimal('conversion_rate', 12, 6)
    table.string('card_suffix')

    // Merchant
    table.string('merchant_id')
    table.string('merchant_name')
    table.string('merchant_website')
    table.string('merchant_logo')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('transactions')
}
