import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import { categories } from '../../../data/cats.js'
import { ChevronDown, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CategoryDropdownProps {
  onCategoryChange: (category: string) => void
}

export default function CategoryDropdown({ onCategoryChange }: CategoryDropdownProps) {
  const [selected, setSelected] = useState('all')
  const [isOpen, setIsOpen] = useState(false)
  
  // Initialize with 'all' selected
  useEffect(() => {
    onCategoryChange('all')
  }, [])

  const handleCategoryChange = (value: string) => {
    setSelected(value)
    onCategoryChange(value)
  }
  
  const clearSelection = () => {
    setSelected('all')
    onCategoryChange('all')
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
        <Filter size={14} />
        <span>Category:</span>
      </div>
      <div className="relative">
        <Select 
          value={selected} 
          onValueChange={handleCategoryChange} 
          onOpenChange={setIsOpen}
        >
          <SelectTrigger 
            className={`w-[200px] border border-slate-200 bg-white hover:bg-slate-50 transition-colors rounded-md flex items-center justify-between shadow-sm ${selected !== 'all' ? 'border-blue-400 text-blue-600' : ''}`}
          >
            <SelectValue placeholder="All Categories" />
            <div className="flex items-center">
              {selected !== 'all' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 mr-1 hover:bg-slate-100 hover:text-slate-900" 
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                >
                  <X size={12} />
                </Button>
              )}
              <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>
          </SelectTrigger>
          <SelectContent 
            className="max-h-64 overflow-y-auto bg-white border border-slate-200 shadow-md" 
            position="popper"
            sideOffset={4}
          >
            <SelectItem value="all" className="font-medium">
              <div className="flex items-center justify-between w-full">
                <span>All Categories</span>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full">
                  {Object.values(categories).flat().length}
                </span>
              </div>
            </SelectItem>
            <div className="h-px bg-muted my-1" />
            {Object.entries(categories).map(([category, subcategories]) => (
              <SelectGroup key={category}>
                <SelectLabel className="flex items-center justify-between text-slate-700 font-medium px-2 py-1.5">
                  <span>{category}</span>
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                    {subcategories.length}
                  </span>
                </SelectLabel>
                {subcategories.map((sub) => (
                  <SelectItem key={sub} value={sub} className="pl-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${selected === sub ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                        <span className={selected === sub ? 'font-medium text-blue-600' : ''}>{sub}</span>
                      </div>
                      {selected === sub && (
                        <span className="text-blue-500 text-xs font-medium">Selected</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
