import React, { useState, useEffect } from 'react'
import type { Transaction } from '../../../models/transactions'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

type Props = {
  transactions: Transaction[]
}

type MonthlyData = {
  month: string
  income: number
  expenses: number
  net: number
}

export default function MonthlyOverview({ transactions }: Props) {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  
  // Get available years from transactions
  const availableYears = [...new Set(transactions.map(tx => 
    new Date(tx.date).getFullYear()
  ))].sort((a, b) => b - a) // Sort descending

  useEffect(() => {
    // Group transactions by month
    const monthlyTotals = transactions
      .filter(tx => new Date(tx.date).getFullYear() === selectedYear)
      .reduce<Record<string, { income: number; expenses: number }>>((acc, tx) => {
        const date = new Date(tx.date)
        const monthKey = date.toLocaleString('default', { month: 'short' })
        
        if (!acc[monthKey]) {
          acc[monthKey] = { income: 0, expenses: 0 }
        }
        
        if (tx.amount > 0) {
          acc[monthKey].income += tx.amount
        } else {
          acc[monthKey].expenses += Math.abs(tx.amount)
        }
        
        return acc
      }, {})
    
    // Convert to array and calculate net
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = monthOrder.map(month => {
      const monthData = monthlyTotals[month] || { income: 0, expenses: 0 }
      return {
        month,
        income: monthData.income,
        expenses: monthData.expenses,
        net: monthData.income - monthData.expenses
      }
    })
    
    setMonthlyData(data)
  }, [transactions, selectedYear])

  // Chart data
  const chartData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(d => d.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(d => d.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Net',
        data: monthlyData.map(d => d.net),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Monthly Overview for ${selectedYear}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
  }

  return (
    <div className="monthly-overview-container">
      <div className="overview-header">
        <h3>Monthly Overview</h3>
        <div className="year-selector">
          <label htmlFor="year-select">Select Year: </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="year-dropdown"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="monthly-summary">
        <table className="monthly-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map(data => (
              <tr key={data.month}>
                <td>{data.month}</td>
                <td className="income">${data.income.toFixed(2)}</td>
                <td className="expense">${data.expenses.toFixed(2)}</td>
                <td className={data.net >= 0 ? 'positive' : 'negative'}>
                  ${Math.abs(data.net).toFixed(2)}
                  {data.net >= 0 ? ' (+)' : ' (-)'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
