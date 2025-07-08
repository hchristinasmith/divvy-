import { useState } from 'react'
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

interface CategoryDropdownProps {
  onCategoryChange: (category: string) => void
}

export default function CategoryDropdown({ onCategoryChange }: CategoryDropdownProps) {
  const [selected, setSelected] = useState('')

  const handleCategoryChange = (value: string) => {
    setSelected(value)
    onCategoryChange(value)
  }

  return (
    <Select value={selected} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent className="max-h-72 overflow-y-auto">
        <SelectItem value="all">All Categories</SelectItem>
        {Object.entries(categories).map(([category, subcategories]) => (
          <SelectGroup key={category}>
            <SelectLabel className="text-muted-foreground">
              {category}
            </SelectLabel>
            {subcategories.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
