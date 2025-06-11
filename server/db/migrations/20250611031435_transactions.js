/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary()
    table.string('akahu_id').unique()
    table.string('account_id')
    table.string('user_id')
    table.string('connection_id')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.timestamp('date')
    table.string('description')
    table.float('amount')
    table.float('balance')
    table.string('type')
    table.string('hash')

    // Embedded category
    table.string('category_id')
    table.string('category_name')
    table.string('category_group_id')
    table.string('category_group_name')

    // Embedded meta
    table.string('particulars')
    table.string('code')
    table.string('reference')
    table.string('other_account')
    table.string('logo')
    table.float('conversion_amount')
    table.float('conversion_currency')
    table.float('conversion_rate')
    table.string('card_suffix')

    // Embedded merchange
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
