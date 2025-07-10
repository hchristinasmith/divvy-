import connection from './connection'
import { Target } from '../../models/targets'

export async function getAllTargetsByUserId(userId: number, db = connection): Promise<Target[]> {
  return db('targets')
    .where('user_id', userId)
    .select(
      'user_id',
      'category',
      'target_amount',
      'period',
      'created_at',
      'updated_at'
    )
}

export async function addTarget(target: Omit<Target, 'created_at' | 'updated_at'>, db = connection): Promise<number[]> {
  const now = new Date()
  return db('targets').insert({
    ...target,
    created_at: now,
    updated_at: now,
  })
}

export async function updateTarget(
  userId: number,
  category: string,
  period: string,
  updatedTarget: Partial<Omit<Target, 'user_id' | 'category' | 'period' | 'created_at'>>,
  db = connection
): Promise<number> {
  const now = new Date()
  return db('targets')
    .where({
      user_id: userId,
      category,
      period,
    })
    .update({
      ...updatedTarget,
      updated_at: now,
    })
}

export async function deleteTarget(
  userId: number,
  category: string,
  period: string,
  db = connection
): Promise<number> {
  return db('targets')
    .where({
      user_id: userId,
      category,
      period,
    })
    .delete()
}
