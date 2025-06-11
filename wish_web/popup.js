/* eslint-disable no-undef */
clickBtn.addEventListener('click', () => {
  // removed unused currentTime

  chrome.runtime.sendMessage({ action: 'buttonClicked' }, (response) => {
    if (response && response.status) {
      statusDiv.innerHTML = `<p>${response.status}</p>`
    }
  })

  chrome.storage.local.get(['lastClicked'], (result) => {
    if (result.lastClicked) {
      const last = new Date(result.lastClicked).toLocaleTimeString()
      statusDiv.innerHTML += `<p>Last clicked: ${last}</p>`
    }

    chrome.storage.local.set({ lastClicked: Date.now() })
  })
})
