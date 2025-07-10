import { Target } from '../../models/targets'
import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

// Get all targets for the current user
export async function getTargets(): Promise<Target[]> {
  try {
    const response = await request.get(`${rootURL}/targets`)
    return response.body
  } catch (error) {
    console.error('Error fetching targets:', error)
    throw error
  }
}

// Add a new target
export async function addTarget(target: Omit<Target, 'user_id' | 'created_at' | 'updated_at'>): Promise<Target> {
  try {
    const response = await request.post(`${rootURL}/targets`).send(target)
    return response.body
  } catch (error) {
    console.error('Error adding target:', error)
    throw error
  }
}

// Update an existing target
export async function updateTarget(
  category: string,
  period: string,
  targetAmount: number
): Promise<void> {
  try {
    await request
      .put(`${rootURL}/targets/${encodeURIComponent(category)}/${encodeURIComponent(period)}`)
      .send({ target_amount: targetAmount })
  } catch (error) {
    console.error('Error updating target:', error)
    throw error
  }
}

// Delete a target
export async function deleteTarget(category: string, period: string): Promise<void> {
  try {
    await request.delete(`${rootURL}/targets/${encodeURIComponent(category)}/${encodeURIComponent(period)}`)
  } catch (error) {
    console.error('Error deleting target:', error)
    throw error
  }
}
