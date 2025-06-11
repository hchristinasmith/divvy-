console.log('Wish Web Extension content script loaded')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performAction') {
    console.log('Performing action on the page')
    highlightProduct()
    sendResponse({ result: 'Action completed successfully' })
  }
})

// Highlighting sample
function addCustomStyle() {
  const style = document.createElement('style')
  style.textContent = `
    .wish-web-highlight {
      background-color: rgba(255, 255, 0, 0.3) !important;
      border: 2px dashed orange !important;
    }
    .wish-save-button {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 99999;
      background: #e60023;
      color: white;
      border: none;
      padding: 10px 15px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 6px;
      transition: transform 0.2s ease;
    }
    .wish-save-button:hover {
      transform: scale(1.05);
    }
    .wish-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 100000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      transition: opacity 0.3s, transform 0.3s;
      opacity: 0;
      transform: translateY(-20px);
    }
    .wish-notification.show {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)
}

function highlightProduct() {
  // Find product elements based on common selectors
  const productElements = document.querySelectorAll(
    '.product, .product-container, [data-product-id], [itemtype*="Product"], .item-container',
  )

  if (productElements.length > 0) {
    // Add highlight class to all found product elements
    productElements.forEach((element) => {
      element.classList.add('wish-web-highlight')
    })
  } else {
    // Fallback: highlight main content area if no specific product elements found
    const mainContent =
      document.querySelector('main') ||
      document.querySelector('.main-content') ||
      document.querySelector('#content')
    if (mainContent) {
      mainContent.classList.add('wish-web-highlight')
    } else {
      // Last resort: add a subtle highlight to the body
      document.body.classList.add('wish-web-highlight')
    }
  }
}

function addSaveButton() {
  const btn = document.createElement('button')
  btn.textContent = '💾 Save Product'
  btn.className = 'wish-save-button'
  btn.onclick = () => {
    // Extract product information
    const title = document.title.trim()
    const url = window.location.href

    // Try multiple selectors to find product images
    const productImage =
      document.querySelector('.product-image img') ||
      document.querySelector('[data-image-role="product"] img') ||
      document.querySelector('.gallery-image') ||
      document.querySelector('img[itemprop="image"]')

    // Fallback to any image if no product image found
    const image = productImage?.src || document.querySelector('img')?.src || ''

    // Show notification if no image found
    if (!image) {
      showNotification('Warning: No product image found', 'warning')
    }

    chrome.runtime.sendMessage(
      {
        action: 'saveProduct',
        data: { title, url, image },
      },
      (response) => {
        if (response && response.status) {
          showNotification(response.status)
        }
      },
    )
  }
  document.body.appendChild(btn)
}

function showNotification(message, type = 'success') {
  // Remove any existing notification
  const existingNotification = document.querySelector('.wish-notification')
  if (existingNotification) {
    document.body.removeChild(existingNotification)
  }

  // Create new notification
  const notification = document.createElement('div')
  notification.className = 'wish-notification'
  notification.textContent = message

  // Set background color based on type
  if (type === 'warning') {
    notification.style.backgroundColor = '#ff9800'
  } else if (type === 'error') {
    notification.style.backgroundColor = '#f44336'
  }

  document.body.appendChild(notification)

  // Show notification with animation
  setTimeout(() => notification.classList.add('show'), 10)

  // Hide and remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

;(function init() {
  addCustomStyle()
  addSaveButton()
})()
