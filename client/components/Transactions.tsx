import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import LayoutWrapper from './LayoutWrapper'
import CategoryDropdown from './CategoryDropDown'

const sampleTransactions = [
  {
    id: 'trans_1',
    date: '2025-06-05',
    description: 'PT140728 PILATES WIT 7416 QUEENSTOWN 448131051256',
    amount: -70,
    category_group_name: 'Health & Fitness',
  },
  {
    id: 'trans_2',
    date: '2025-06-04',
    description: 'Coffee Shop',
    amount: -5,
    category_group_name: 'Food & Drink',
  },
  {
    id: 'trans_3',
    date: '2025-06-03',
    description: 'Salary',
    amount: 3000,
    category_group_name: 'Income',
  },
]

export default function Transactions() {
  return (
    <LayoutWrapper>
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-semibold">Transactions</h2>

        {/* Search bar */}
        <div className="mb-4 flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search transactions..."
            className="flex-grow rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <CategoryDropdown />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.description}</TableCell>
                <TableCell className="text-right font-semibold">
                  {txn.amount.toFixed(2)}
                </TableCell>
                <TableCell>{txn.category_group_name}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" aria-label="Edit category">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </LayoutWrapper>
  )
}
