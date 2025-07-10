/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary()
    table.string('akahu_id').unique() 
    table.string('_authorisation')
    table.string('_credentials')

    // Connection info
    table.string('connection_id')
    table.string('connection_name')
    table.string('connection_logo')

    // Account meta
    table.string('name')
    table.string('formatted_account')
    table.string('status')
    table.string('type')
    table.json('attributes')

    // Balance
    table.string('currency')
    table.decimal('current_balance', 14, 2)
    table.boolean('overdrawn')

    // Meta
    table.string('holder')

    // Breakdown (optional nested object)
    table.decimal('fees', 14, 2)
    table.decimal('employer_contributions', 14, 2)
    table.decimal('member_tax_credit', 14, 2)
    table.decimal('personal_contributions', 14, 2)
    table.decimal('previous_balance', 14, 2)
    table.decimal('returns', 14, 2)
    table.decimal('tax', 14, 2)
    table.decimal('withdrawals', 14, 2)

    // Refreshed timestamps
    table.timestamp('refreshed_balance')
    table.timestamp('refreshed_meta')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('accounts')
}
