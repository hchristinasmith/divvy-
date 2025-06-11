// Background script runs in the background
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')

  // Set default storage values
  chrome.storage.local.set(
    {
      installDate: Date.now(),
      counter: 0,
      saved: [], // initialize saved products list
    },
    () => {
      // Check for any errors with storage initialization
      if (chrome.runtime.lastError) {
        console.error('Error initializing storage:', chrome.runtime.lastError)
      } else {
        console.log('Storage initialized successfully')
      }
    },
  )
})

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle button click events from popup
  if (message.action === 'buttonClicked') {
    chrome.storage.local.get(['counter'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving counter:', chrome.runtime.lastError)
        sendResponse({ status: 'Error: Could not update counter', error: true })
        return
      }

      const newCount = (result.counter || 0) + 1
      chrome.storage.local.set({ counter: newCount }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error updating counter:', chrome.runtime.lastError)
          sendResponse({
            status: 'Error: Could not update counter',
            error: true,
          })
        } else {
          sendResponse({ status: 'Action received! Click count: ' + newCount })
        }
      })
    })
    return true // async response
  }

  // Handle product save requests from content script
  if (message.action === 'saveProduct') {
    const product = message.data

    // Validate product data
    if (!product || !product.url) {
      console.error('Invalid product data received')
      sendResponse({ status: 'Error: Invalid product data', error: true })
      return true
    }

    // Get current saved list, append new product
    chrome.storage.local.get(['saved'], (result) => {
      if (chrome.runtime.lastError) {
        console.error(
          'Error retrieving saved products:',
          chrome.runtime.lastError,
        )
        sendResponse({ status: 'Error: Could not save product', error: true })
        return
      }

      const saved = result.saved || []

      // Check if product already exists to avoid duplicates
      const isDuplicate = saved.some((item) => item.url === product.url)

      if (isDuplicate) {
        console.log('Product already saved:', product.url)
        sendResponse({ status: 'Product already in your wishlist' })
        return
      }

      // Add timestamp to product
      const productWithTimestamp = {
        ...product,
        savedAt: Date.now(),
      }

      const updated = [...saved, productWithTimestamp]
      chrome.storage.local.set({ saved: updated }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error saving product:', chrome.runtime.lastError)
          sendResponse({ status: 'Error: Could not save product', error: true })
        } else {
          console.log('Product saved:', product)
          sendResponse({ status: 'Product saved successfully!' })
        }
      })
    })
    return true // async response
  }

  // Handle performAction requests from popup
  if (message.action === 'performAction') {
    // Send message to active tab's content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError || !tabs || tabs.length === 0) {
        console.error(
          'Error finding active tab:',
          chrome.runtime.lastError || 'No active tab found',
        )
        sendResponse({
          status: 'Error: Could not find active tab',
          error: true,
        })
        return
      }

      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'performAction' },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error(
              'Error sending message to content script:',
              chrome.runtime.lastError,
            )
            sendResponse({
              status: 'Error: Content script not available',
              error: true,
            })
          } else {
            sendResponse(response || { status: 'Action performed' })
          }
        },
      )
    })
    return true // async response
  }

  // Handle unknown action types
  console.warn('Unknown action received:', message.action)
  sendResponse({ status: 'Unknown action: ' + message.action, error: true })
  return false
})

// Listen for tab updates to inject content script when needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    tab.url.startsWith('http')
  ) {
    console.log('Tab updated:', tab.url)
  }
})
