import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import type { Transaction } from '../../../models/transactions'

interface MonthlyOverviewProps {
  transactions: Transaction[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MonthlyOverview({
  transactions,
}: MonthlyOverviewProps) {
  console.log(transactions)
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Spending Overview: Actual vs Target
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
