import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

interface SearchTxnsProps {
  onSearch: (term: string) => void
}

export default function SearchTxns({ onSearch }: SearchTxnsProps) {
  const [searchInput, setSearchInput] = useState('')
  
  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchInput)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [searchInput, onSearch])
  
  return (
    <div className="relative flex items-center w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search transactions..."
        className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] pl-10 pr-4 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:border-[var(--ring)]"
      />
    </div>
  )
}
