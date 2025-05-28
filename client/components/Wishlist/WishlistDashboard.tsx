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
      //reset form fields
      setName('')
      setPriority('medium')
      setUrl('')
    }
  }
  
  // function to remove an item from the wishlist
  const handleRemove = (id: number) => {
    // filter out the item with the matching id
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }
  return (
    <div className="wishlist">
      <h2>WISHLIST</h2>
      <div className="wishlist-form-container">
        <form onSubmit={handleAdd} className="wishlist-form">
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What do you wish for? <3"
              required
            />
          </div>
          
          <div className="form-group">
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value as WishlistItem['priority'])}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Item URL (optional)"
            />
          </div>

          <button type="submit" className="add-button">blow a wish</button>
        </form>
      </div>
      {items.length === 0 ? (
        <div className="empty-message">Your wishlist is empty. Add some wishes above!</div>
      ) : (
        <ul className="wishlist-items">
          {items.map((item) => (
            <li key={item.id} className={`priority-${item.priority}`}>
              <div>
                <strong>{item.name}</strong> - Priority: <em>{item.priority}</em>
                {item.url && (
                  <span className="item-url"> - <a href={item.url} target="_blank" rel="noopener noreferrer">View</a></span>
                )}
              </div>
              <button 
                onClick={() => handleRemove(item.id)} 
                className="remove-button"
                aria-label="Remove item"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
