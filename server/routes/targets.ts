import express from 'express'
import * as db from '../db/targets'
import knex from '../db/knex'

const router = express.Router()

// GET /api/v1/targets
// Get all targets for the authenticated user
router.get('/', async (req, res) => {
  try {
    // For now, using a hardcoded user ID (1) for development
    // In production, this would come from authentication
    const userId = 1
    
    const targets = await db.getAllTargetsByUserId(userId)
    res.json(targets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to retrieve targets' })
  }
})

// POST /api/v1/targets
// Add a new target for the authenticated user
router.post('/', async (req, res) => {
  try {
    // For now, using a hardcoded user ID (1) for development
    // In production, this would come from authentication
    const userId = 1
    
    const { category, target_amount, period } = req.body
    
    if (!category || !target_amount || !period) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    
    const newTarget = {
      user_id: userId,
      category,
      target_amount: parseFloat(target_amount),
      period
    }
    
    const [id] = await db.addTarget(newTarget)
    res.status(201).json({ id, ...newTarget })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add target' })
  }
})

// PUT /api/v1/targets/:category/:period
// Update an existing target
router.put('/:category/:period', async (req, res) => {
  try {
    // For now, using a hardcoded user ID (1) for development
    // In production, this would come from authentication
    const userId = 1
    
    const { category, period } = req.params
    const { target_amount } = req.body
    
    if (!target_amount) {
      return res.status(400).json({ message: 'Missing target amount' })
    }
    
    const updatedCount = await db.updateTarget(
      userId,
      category,
      period,
      { target_amount: parseFloat(target_amount) }
    )
    
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Target not found' })
    }
    
    res.json({ message: 'Target updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update target' })
  }
})

// DELETE /api/v1/targets/:category/:period
// Delete a target
router.delete('/:category/:period', async (req, res) => {
  try {
    // For now, using a hardcoded user ID (1) for development
    // In production, this would come from authentication
    const userId = 1
    
    const { category, period } = req.params
    
    const deletedCount = await db.deleteTarget(userId, category, period)
    
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Target not found' })
    }
    
    res.json({ message: 'Target deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete target' })
  }
})

export default router
