import express from 'express'
import { Category } from '../../models/categories'

const router = express.Router()

// Sample categories data
const categories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#4CAF50' },
  { id: '2', name: 'Shopping', color: '#2196F3' },
  { id: '3', name: 'Transportation', color: '#FF9800' },
  { id: '4', name: 'Entertainment', color: '#9C27B0' },
  { id: '5', name: 'Housing', color: '#607D8B' },
  { id: '6', name: 'Utilities', color: '#795548' },
  { id: '7', name: 'Income', color: '#4CAF50' },
  { id: '8', name: 'Other', color: '#9E9E9E' },
]

// GET /api/v1/categories
router.get('/', (req, res) => {
  res.json({ items: categories })
})

export default router
