import { Targets, TargetsOverviewProps } from '../../../models/targets'
import LayoutWrapper from '../Layout/LayoutWrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TargetsCard } from './TargetsCard'
import { SavingsGoals } from './SavingsGoals'
import { mockSavingsGoals } from './mockSavingsGoals'
import { useState } from 'react'
import { PencilIcon, CheckIcon, PlusIcon, Loader2, CalendarHeart, Target } from 'lucide-react'
import { useTargets } from '../../hooks/useTargets'
import { useAllTransactions } from '../../hooks/useTransactions'

// This interface extends Target to include calculated fields needed for the UI
interface TargetWithCalculations extends Targets {
  spent: number // This would come from actual transaction data
  status: 'Over Target' | 'Watch' | 'Close' | 'On Track' // Calculated based on spent vs target_amount
}

export default function TargetsOverview() {
  // State for edit mode toggle
  const [editMode, setEditMode] = useState(false);
  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [newTarget, setNewTarget] = useState<{
    category: string;
    target_amount: number;
    period: string;
  }>({ category: '', target_amount: 0, period: 'monthly' });
  
  // Get transactions data
  const { data: transactionsData } = useAllTransactions();
  const transactions = transactionsData?.items || [];
  
  // Get targets data using our custom hook
  const { targets: targetsWithCalculations, isLoading, error, addNewTarget, updateTargetAmount, removeTarget } = useTargets({
    transactions
  });
  
  // Handle edit actions
  const handleEditTarget = (target: any) => {
    const newAmount = prompt(`Enter new target amount for ${target.category}:`, target.target_amount.toString());
    
    if (newAmount !== null) {
      const amount = parseFloat(newAmount);
      if (!isNaN(amount) && amount > 0) {
        updateTargetAmount(target.category, target.period, amount);
      } else {
        alert('Please enter a valid amount');
      }
    }
  };
  
  const handleEditSavingsGoal = (goal: any) => {
    alert(`Edit savings goal: ${goal.name}`);
    // In a real app, this would open a modal or navigate to an edit page
  };
  
  const activeTargets = targetsWithCalculations.length
  const onTrackCount = targetsWithCalculations.filter(
    (t) => t.status === 'On Track' || t.status === 'Close',
  ).length
  const overTargetCount = targetsWithCalculations.filter(
    (t) => t.status === 'Over Target',
  ).length
  const totalBudget = targetsWithCalculations.reduce((acc, t) => acc + t.target_amount, 0)
  const totalSpent = targetsWithCalculations.reduce((acc, t) => acc + t.spent, 0)
  const remaining = totalBudget - totalSpent
  const overallUsage = Math.min((totalSpent / totalBudget) * 100, 150).toFixed(
    0,
  )

  function formatCurrency(amount: number) {
    return `$${amount.toLocaleString()}`
  }

  return (
    <LayoutWrapper>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button 
            variant={editMode ? "secondary" : "outline"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-1 shadow-white"
          >
            {editMode ? (
              <>
                <CheckIcon size={16} />
                Done
              </>
            ) : (
              <>
                <PencilIcon size={16} />
                Edit
              </>
            )}
          </Button>
          <Button 
            onClick={() => setIsAddingTarget(!isAddingTarget)}
            className="flex items-center gap-1 bg-[var(--primary)] text-white shadow-white"
          >
            <PlusIcon size={16} />
            New Target
          </Button>
        </div>
      </div>
      {isAddingTarget && (
        <Card className="mb-6 p-4 bg-[var(--card)] rounded-xl shadow-white">
          <div className="flex items-center gap-2 bg-[var(--primary)] text-white px-3 py-2 rounded rounded-full shadow-white mb-4 w-fit">
            <PlusIcon size={16} />
            <h3 className="font-semibold">Add New Target</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded bg-white/5 text-foreground border-[var(--border)]" 
                value={newTarget.category}
                onChange={(e) => setNewTarget({...newTarget, category: e.target.value})}
                placeholder="e.g. Groceries, Entertainment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Amount</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded bg-white/5 text-foreground border-[var(--border)]" 
                value={newTarget.target_amount || ''}
                onChange={(e) => setNewTarget({...newTarget, target_amount: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Period</label>
              <select 
                className="w-full p-2 border rounded bg-white/5 text-foreground border-[var(--border)]"
                value={newTarget.period}
                onChange={(e) => setNewTarget({...newTarget, period: e.target.value})}
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                onClick={async () => {
                  if (!newTarget.category || !newTarget.target_amount) {
                    alert('Please fill in all fields');
                    return;
                  }
                  try {
                    await addNewTarget(newTarget);
                    setNewTarget({ category: '', target_amount: 0, period: 'monthly' });
                    setIsAddingTarget(false);
                  } catch (err) {
                    console.error('Failed to add target:', err);
                  }
                }}
                className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-white"
              >
                Save Target
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingTarget(false);
                  setNewTarget({ category: '', target_amount: 0, period: 'monthly' });
                }}
                className="hover:bg-white/20 transition-colors duration-200 shadow-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center p-12 bg-[var(--card)] rounded-xl shadow-white">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
          <span className="ml-2 font-medium">Loading targets...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100/20 border border-red-400/50 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-white">
          {error}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="shadow-white bg-[var(--card)] rounded-xl">
        <CardContent className="pt-4 text-center">
            <span className="block text-2xl font-semibold text-[var(--primary)]">{activeTargets}</span>
            <span className="text-lg font-semibold">Active Targets</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-white bg-[var(--card)] rounded-xl">
        <CardContent className="pt-4 text-center">
        <span className="block text-2xl font-semibold text-green-500">{onTrackCount}</span>
            <span className="text-lg font-semibold">On Track</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-white bg-[var(--card)] rounded-xl">
        <CardContent className="pt-4 text-center">
        <span className="block text-2xl font-semibold text-red-500">{overTargetCount}</span>
            <span className="text-lg font-semibold">Over Target</span>
          </CardContent>
        </Card>
      </div>
        </div>
      )}
<div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="shadow-white bg-[var(--card)] rounded-xl">
        <CardContent className="pt-4 text-center">
            <span className="block text-2xl font-semibold text-[var(--primary)]">{overallUsage}%</span>
            <span className="text-lg font-semibold">Overall Usage</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-white bg-[var(--card)] rounded-xl">
        <CardContent className="pt-4 text-center">
            <span className="block text-lg font-semibold">Total Budgeted</span>
            <span className="block text-xl font-semibold mt-1 text-[var(--primary)]">{formatCurrency(totalBudget)}</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-white bg-[var(--card)] rounded-xl">
        <CardContent className="pt-4 text-center">
            <span className="block text-lg font-semibold">Total Spent</span>
            <span className="block text-xl font-semibold mt-1 text-[var(--primary)]">{formatCurrency(totalSpent)}</span>
          </CardContent>
        </Card>
      
      <Card className="shadow-white bg-[var(--card)] rounded-xl">
      <CardContent className="pt-4 text-center">
      <span className="block text-lg font-semibold">Remaining</span>
            <span className="block text-xl font-semibold mt-1 text-[var(--primary)]">{formatCurrency(remaining)}</span>
        </CardContent>
      </Card>
      </div>

      </div>
      <div>
    <div className="flex items-center gap-2 bg-[var(--card)] text-foreground px-3 py-2 rounded rounded-full shadow-white mb-4 w-fit">
      <Target size={18} />
      <h2 className="text-lg font-semibold">Spending Targets</h2>
    </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {targetsWithCalculations.map((target) => (
          <div key={`${target.user_id}-${target.category}-${target.period}`}>
              <TargetsCard 
              target={target} 
              formatCurrency={formatCurrency}
              onEdit={handleEditTarget}
              showEditIcon={editMode}
              onDelete={editMode ? () => {
                if (confirm(`Are you sure you want to delete the ${target.category} target?`)) {
                  removeTarget(target.category, target.period);
                }
              } : undefined}
            />
          </div>
        ))}
      </div>
      </div>
      <div className="mb-6">
      <div className="flex items-center gap-2 bg-[var(--card)] text-foreground px-3 py-2 rounded rounded-full shadow-white mb-4 w-fit">
        <CalendarHeart size={18} />
        <h2 className="text-lg font-semibold">Savings Goals</h2>
      </div>
      
      <SavingsGoals 
        goals={mockSavingsGoals}
        formatCurrency={formatCurrency}
        onEdit={handleEditSavingsGoal}
        showEditIcon={editMode}
      />
      </div>
   </LayoutWrapper>
  )
}
