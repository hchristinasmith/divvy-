import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Filter, FilterX, ChevronDown, ChevronUp, Calendar as CalendarIcon } from 'lucide-react'

interface TransactionFiltersProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  dateRange: { from: Date | undefined; to: Date | undefined }
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void
  onResetFilters: () => void
}

export default function TransactionFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  dateRange,
  onDateRangeChange,
  onResetFilters,
}: TransactionFiltersProps) {
  const [showCategories, setShowCategories] = useState(false)
  
  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Format date range for display
  const getDateRangeText = () => {
    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
    } else if (dateRange.from) {
      return `From ${formatDate(dateRange.from)}`
    } else if (dateRange.to) {
      return `Until ${formatDate(dateRange.to)}`
    }
    return 'All dates'
  }

  const [showDatePicker, setShowDatePicker] = useState(false)
  
  // Handle date selection
  const handleDateSelect = (type: 'from' | 'to', date: Date | null) => {
    if (type === 'from') {
      onDateRangeChange({ from: date || undefined, to: dateRange.to })
    } else {
      onDateRangeChange({ from: dateRange.from, to: date || undefined })
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-2 px-1">
      {/* Filter Label */}
      <div className="flex items-center gap-1 text-white">
        <Filter className="h-4 w-4" />
        <span className="text-sm">Filters:</span>
      </div>
      
      {/* Category Filter */}
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-[var(--card)] border-[var(--primary)]/30 text-primary flex items-center gap-1"
          onClick={() => {
            setShowCategories(!showCategories)
            setShowDatePicker(false)
          }}
        >
          <span>Category: {selectedCategory === 'all' ? 'All' : selectedCategory}</span>
          {showCategories ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </Button>
        
        {showCategories && (
          <div className="absolute z-10 mt-1 w-56 rounded-md bg-[var(--card)] shadow-lg border border-[var(--primary)]/30 p-1">
            <div 
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-[var(--primary)]/30 rounded-md ${selectedCategory === 'all' ? 'bg-[var(--primary)]/50' : ''}`}
              onClick={() => {
                onCategoryChange('all')
                setShowCategories(false)
              }}
            >
              All Categories
            </div>
            {categories.map((category) => (
              <div 
                key={category}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-[var(--primary)]/30 rounded-md ${selectedCategory === category ? 'bg-[var(--primary)]/50' : ''}`}
                onClick={() => {
                  onCategoryChange(category)
                  setShowCategories(false)
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onResetFilters}
        className="ml-auto text-primary hover:bg-[var(--primary)]/30"
      >
        <FilterX className="mr-1 h-4 w-4" />
        Reset
      </Button>
    </div>
  )
}
