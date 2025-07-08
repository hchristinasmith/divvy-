import { useState, useEffect } from 'react'

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
    <div className="flex space-x-4 items-center">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search transactions..."
        className="w-full rounded-md border border-pink-100 bg-white px-3 py-2 text-sm placeholder:text-pink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 focus-visible:border-pink-300"
      />
    </div>
  )
}
