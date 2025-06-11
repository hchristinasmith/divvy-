//needs editting

import express from 'express'
import pool from '../db.js'

const router = express.Router()

// Save a new pin
router.post('/', async (req, res) => {
  const { imageUrl, pageUrl, title, notes } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO pins (image_url, page_url, title, notes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [imageUrl, pageUrl, title, notes],
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all saved pins
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM pins ORDER BY created_at DESC',
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
