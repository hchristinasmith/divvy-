import type { Transaction } from '../../../models/transactions'
import { transactionsByCategory } from './TxAnalysis'

type Props = {
  transactions: Transaction[]
}

export default function TransactionsByCategory({ transactions }: Props) {
  const grouped = transactionsByCategory(transactions)

  return (
    <div>
      <h3>Transactions by Category</h3>
      <ul>
        {Object.entries(grouped).map(([category, txs]) => (
          <li key={category}>
            <strong>{category}</strong>
            <ul>
              {txs.map((tx) => (
                <li key={tx._id}>
                  {tx.description} — ${tx.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
