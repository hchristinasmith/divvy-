import { useState } from 'react'
import LayoutWrapper from '../LayoutWrapper'

interface WishlistItem {
  id: number
  name: string
  price: number
  priority: 'low' | 'medium' | 'high'
  notes: string
  url: string
}

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [name, setName] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [url, setUrl] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() !== '') {
      const newItem: WishlistItem = {
        id: Date.now(),
        name: name.trim(),
        priority,
        notes: '',
        url: url.trim(),
        price: 0,
      }
      setItems([...items, newItem])
      setName('')
      setPriority('medium')
      setUrl('')
    }
  }

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // Priority color classes
  const priorityColors = {
    low: 'bg-pink-100 text-pink-700',
    medium: 'bg-pink-200 text-pink-900',
    high: 'bg-pink-300 text-pink-950 font-semibold',
  }

  return (
    <LayoutWrapper>
      <div className="max-w-xl mx-auto p-4 bg-white dark:bg-[#422b21] rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-stone-800 dark:text-stone-200">
          Wishlist
        </h2>
        <form onSubmit={handleAdd} className="mb-6 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add to wishlist"
            required
            className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-stone-700 dark:text-stone-100 transition"
          />
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as WishlistItem['priority'])
            }
            className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-stone-700 dark:text-stone-100 transition"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Item URL (optional)"
            className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-stone-700 dark:text-stone-100 transition"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-pink-400 text-white font-semibold shadow-md hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 active:bg-pink-600 transition"
          >
            Add to Wishlist
          </button>
        </form>

        {items.length === 0 ? (
          <p className="text-center text-stone-500 dark:text-stone-400">
            Your wishlist is empty. Add some wishes above!
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map(({ id, name, priority, url }) => (
              <li
                key={id}
                className={`flex justify-between items-center rounded-md p-3 ${priorityColors[priority]} shadow-sm`}
              >
                <div>
                  <span className="block text-lg">{name}</span>
                  <small className="italic">Priority: {priority}</small>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-pink-700 dark:text-pink-300 hover:underline"
                    >
                      View
                    </a>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(id)}
                  aria-label="Remove item"
                  className="ml-4 text-pink-900 dark:text-pink-100 hover:text-pink-700 dark:hover:text-pink-300 font-bold text-xl"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </LayoutWrapper>
  )
}
