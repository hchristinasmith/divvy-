import { useState } from 'react'
import { Transaction } from 'models/transactions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  transaction: Transaction
}

export default function TxnItems({ transaction }: Props) {
  const [formData, setFormData] = useState({
    description: transaction.description,
    category: transaction.category_group_name,
  })
  const [editing, setEditing] = useState(false)

  const queryClient = useQueryClient()

  const editTxnMutation = useMutation({
    mutationFn: ({ description, category_group_name }: Transaction) =>
      editTxn({ description, category_group_name }, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['txns'] })
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editTxnMutation.mutate({ id: transaction.id, ...formData })
  }

  return (
    <TableRow>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>
        {editing ? (
          <input
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          transaction.description
        )}
      </TableCell>
      <TableCell className="text-right font-semibold">
        {transaction.amount.toFixed(2)}
      </TableCell>
      <TableCell>
        {editing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSubmit}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
