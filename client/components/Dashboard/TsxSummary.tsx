import type { Transaction } from '../../../models/transactions'
import { transactionAnalysis } from './TxAnalysis'

type Props = {
  transactions: Transaction[]
}

export default function TransactionSummary({ transactions }: Props) {
  const { totalAmount, avgAmount, count } = transactionAnalysis(transactions)
  
  // Determine if total amount is positive or negative for styling
  const amountClass = totalAmount >= 0 ? 'positive' : 'negative';

  return (
    <div className="summary-container">
      <h3>Transaction Summary</h3>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-details">
            <div className="summary-label">Total Transactions</div>
            <div className="summary-value">{count}</div>
          </div>
        </div>
        
        <div className={`summary-card ${amountClass}`}>
          <div className="summary-icon">💰</div>
          <div className="summary-details">
            <div className="summary-label">Total Amount</div>
            <div className="summary-value">${Math.abs(totalAmount).toFixed(2)}
              <span className="direction">{totalAmount >= 0 ? ' income' : ' spent'}</span>
            </div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon">⚖️</div>
          <div className="summary-details">
            <div className="summary-label">Average Transaction</div>
            <div className="summary-value">${Math.abs(avgAmount).toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
