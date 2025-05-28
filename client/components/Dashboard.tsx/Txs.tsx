import type { Transaction } from '../../../models/transactions'

interface TransactionsProps {
  transactions: Transaction[]
}

export default function Transactions({ transactions }: TransactionsProps) {

  return (
    <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            <div>
              {tx.description} | Amount: {tx.amount} | Category:{' '}
              {tx.category?.name || 'Unknown'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
