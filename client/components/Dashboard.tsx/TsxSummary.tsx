import type { Transaction } from '../../../models/transactions'
import { transactionAnalysis } from './TxAnalysis'

type Props = {
  transactions: Transaction[]
}

export default function TransactionSummary({ transactions }: Props) {
  const { totalAmount, avgAmount, count } = transactionAnalysis(transactions)

  return (
    <div>
      <h3>Transaction Summary</h3>
      <p>Total Transactions: {count}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <p>Average Transaction Amount: ${avgAmount.toFixed(2)}</p>
    </div>
  )
}
