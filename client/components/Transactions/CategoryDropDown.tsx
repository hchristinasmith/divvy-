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

export default function CategoryDropdown() {
  const [selected, setSelected] = useState('')

  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent className="max-h-72 overflow-y-auto">
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
