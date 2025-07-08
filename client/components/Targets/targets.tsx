import { Target, TargetsOverviewProps } from '../../../models/targets'
import LayoutWrapper from '../LayoutWrapper'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TargetsCard } from './TargetsCard'
import { mockTargets } from './mockTargets'
import { SavingsGoals } from './SavingsGoals'
import { mockSavingsGoals } from './mockSavingsGoals'
import { useState } from 'react'
import { PencilIcon, CheckIcon } from 'lucide-react'

// This interface extends Target to include calculated fields needed for the UI
interface TargetWithCalculations extends Target {
  spent: number // This would come from actual transaction data
  status: 'Over Target' | 'Watch' | 'Close' | 'On Track' // Calculated based on spent vs target_amount
}

export default function TargetsOverview({
  targets,
  onAddNewTarget,
}: TargetsOverviewProps) {
  // State for edit mode toggle
  const [editMode, setEditMode] = useState(false);
  
  // Use mock data for demonstration
  const targetsWithCalculations = mockTargets;
  
  // Handle edit actions
  const handleEditTarget = (target: any) => {
    alert(`Edit target: ${target.category}`);
    // In a real app, this would open a modal or navigate to an edit page
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
        <h1 className="text-3xl font-bold">Financial Targets</h1>
        <div className="flex gap-2">
          <Button 
            variant={editMode ? "secondary" : "outline"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-1"
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
          <Button onClick={() => onAddNewTarget()}>New Target</Button>
        </div>
      </div>
<div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <span className="block text-2xl font-semibold">{activeTargets}</span>
            <span className="text-lg font-semibold">Active Targets</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <span className="block text-2xl font-semibold">{onTrackCount}</span>
            <span className="text-lg font-semibold">On Track</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <span className="block text-2xl font-semibold">{overTargetCount}</span>
            <span className="text-lg font-semibold">Over Target</span>
          </CardContent>
        </Card>
      </div>
</div>
<div>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <span className="block text-2xl font-semibold">{overallUsage}%</span>
            <span className="text-lg font-semibold">Overall Usage</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <span className="block text-lg font-semibold">Total Budgeted</span>
            <span className="block text-xl font-semibold mt-1">{formatCurrency(totalBudget)}</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <span className="block text-lg font-semibold">Total Spent</span>
            <span className="block text-xl font-semibold mt-1">{formatCurrency(totalSpent)}</span>
          </CardContent>
        </Card>
      
      <Card className="shadow-sm">
        <CardContent className="pt-6 text-center">
          <span className="text-xl font-semibold text-[color:var(--primary)]">
            Remaining: {formatCurrency(remaining)}
          </span>
        </CardContent>
      </Card>
      </div>

      </div>
      <div>
    <h2 className='text-2xl font-semibold'> Spending Targets</h2>
      <div className="grid grid-cols-3 gap-6 mb-6">
        {targetsWithCalculations.map((target) => (
          <div key={`${target.user_id}-${target.category}-${target.period}`}>
            <TargetsCard 
              target={target} 
              formatCurrency={formatCurrency}
              onEdit={handleEditTarget}
              showEditIcon={editMode}
            />
          </div>
        ))}
      </div>
      </div>
      <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Savings Goals</h2>
      
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
