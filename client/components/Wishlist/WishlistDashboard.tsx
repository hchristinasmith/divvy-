import React, { useState } from 'react'

interface WishlistItem {
  id: number
  name: string
  price: number
  priority: 'low' | 'medium' | 'high'
  notes: string
  url: string
}

export default function Wishlist() {
  //state to hold a list of items
  const [items, setItems] = useState<WishlistItem[]>([])
  //state for the name name field
  const [name, setName] = useState('')
  //state for the priority dropdown
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [url, setUrl] = useState('')

  // function to add a new item to the wishlist
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    //if name is not empty
    if (name.trim() !== '') {
      //create a new wishlist item object
      const newItem: WishlistItem = {
        id: Date.now(),
        name: name.trim(),
        priority,
        notes: '',
        url: url.trim(),
        price: 0
      }
      //add the item to the list
      setItems([...items, newItem])
      //rest form fields
      setName('')
      setPriority('medium')
      setUrl('')
    }
  }
  return (
    <div>
      <h2>WISHLIST</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What do you wish for? <3"
        />
        
        <select value={priority}
        onChange={(e) => setPriority(e.target.value as WishlistItem['priority'])}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">blow a wish</button>

      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item}</strong> - Priority: <em>{item.priority}</em>{item.url && (
              <>{' '} - <a href {item.url} target='_blank'>View</a></>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
